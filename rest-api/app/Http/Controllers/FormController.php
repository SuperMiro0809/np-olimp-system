<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\{
    Form,
    FormBudget,
    FormBudgetAdministration,
    FormBudgetTeacher,
    FormDeclaration,
    FormDescription,
    FormDescriptionActivity,
    FormDescriptionActivityTeacher,
    FormLetterFile,
    FormSchoolAddress,
    FormSchoolContact,
    FormSchoolInfo,
    FormTeacherLetter,
    FormSetting,
    Group,
    GroupProgram,
    GroupProgramTeacher,
    GroupStudent,
    GroupTeacher
};
use App\Traits\FormTrait;

class FormController extends Controller
{
    use FormTrait;

    public function index($schoolId)
    {
        $forms = $this->getForms($schoolId);

        return $forms;
    }

    public function store(Request $request, $schoolId)
    {
        $subject = json_decode($request->subject, true);
        $form = Form::create([
            'schoolYear' => $request->schoolYear,
            'subject_id' => $subject['value'],
            'school_id' => $schoolId
        ]);

        FormSetting::create(['form_id' => $form->id]);

        //school info
        $formSchoolInfo = FormSchoolInfo::create([
            'fullName' => $request->fullName,
            'type' => $request->type,
            'key' => $request->key,
            'director' => $request->director,
            'form_id' => $form->id
        ]);

        $address = json_decode($request->address, true);
        FormSchoolAddress::create([
            'address' => $address['address'],
            'phone' => $address['phone'],
            'email' => $address['email'],
            'school_info_id' => $formSchoolInfo->id
        ]);

        $contact = json_decode($request->contact, true);
        FormSchoolContact::create([
            'name' => $contact['name'],
            'phone' => $contact['phone'],
            'email' => $contact['email'],
            'school_info_id' => $formSchoolInfo->id
        ]);

        //groups
        $groups = json_decode($request->groups, true);
        foreach($groups as $group) {
            $newGroup = Group::create([
                'class' => $group['class'],
                'lessons' => $group['lessons'],
                'form_id' => $form->id
            ]);

            foreach($group['students'] as $student) {
                GroupStudent::create([
                    'name' => $student['name'],
                    'class' => $student['class'],
                    'group_id' => $newGroup->id
                ]);
            }

            foreach($group['teachers'] as $teacher) {
                GroupTeacher::create([
                    'teacher_id' => $teacher['value'],
                    'group_id' => $newGroup->id
                ]);
            }

            foreach($group['program'] as $program) {
                $newProgram = GroupProgram::create([
                    'theme' => $program['theme'],
                    'lessons' => $program['allLessons'],
                    'remainingLessons' => $program['allLessons'],
                    'group_id' => $newGroup->id
                ]);

                foreach($program['teachers'] as $programTeacher) {
                    GroupProgramTeacher::create([
                        'lessons' => $programTeacher['lessons'],
                        'remainingLessons' => $programTeacher['lessons'],
                        'teacher_id' => $programTeacher['teacher_id'],
                        'program_id' => $newProgram->id
                    ]);
                }
            }
        }

        //description
        $formDescription = FormDescription::create([
            'description' => $request->description,
            'goals' => $request->goals,
            'results' => $request->results,
            'indicatorsOfSuccess' => $request->indicatorsOfSuccess,
            'resources' => $request->resources,
            'form_id' => $form->id
        ]);

        $activities = json_decode($request->activities, true);
        foreach($activities as $activity) {
            $formDescriptionActivity = FormDescriptionActivity::create([
                'activity' => $activity['activity'],
                'date' => $activity['date'],
                'form_description_id' => $formDescription->id
            ]);

            foreach($activity['teachers'] as $teacher) {
                FormDescriptionActivityTeacher::create([
                    'teacher_id' => $teacher['value'],
                    'activity_id' => $formDescriptionActivity->id
                ]);
            }
        }

        //budget
        $budgetObj = json_decode($request->budget, true);
        $budget = FormBudget::create([
            'hourPrice' => $budgetObj['hourPrice'],
            'trainingCosts' => $budgetObj['trainingCosts'],
            'administrationCosts' => $budgetObj['administrationCosts'],
            'form_id' => $form->id
        ]);

        foreach($budgetObj['teachers'] as $teacher) {
            FormBudgetTeacher::create([
                'lessons' => $teacher['lessons'],
                'teacher_id' => $teacher['teacher_id'],
                'budget_id' => $budget->id
            ]);
        }

        if($budgetObj['administration']) {
            foreach($budgetObj['administration'] as $administration) {
                FormBudgetAdministration::create([
                    'activity' => $administration['activity'],
                    'cost' => $administration['cost'],
                    'budget_id' => $budget->id
                ]);
            }
        }

        //additional
        $declarations = $request->file('declarations');

        foreach($declarations as $declaration) {
            $file_path = $declaration->store('declarations', 'public');

            FormDeclaration::create([
                'path' => $file_path,
                'form_id' => $form->id
            ]);
        }

        $letters = json_decode($request->letters, true);
        foreach($letters as $key=>$letter) {
            $newLetter = FormTeacherLetter::create([
                'letter' => $letter['letter'],
                'teacher_id' => $letter['teacher_id'],
                'form_id' => $form->id
            ]);

            if(request('lettersFiles.' . $key . '.files')) {
                $letter_files = $request->file('lettersFiles.' . $key . '.files');
            
                foreach($letter_files as $file) {
                    $file_path = $file->store('letters', 'public');

                    FormLetterFile::create([
                        'path' => $file_path,
                        'letter_id' => $newLetter->id,
                    ]);
                }
            }
        }

        return $form;
    }

    public function edit(Request $request, $schoolId, $id)
    {
        $form = Form::findOrFail($id);

        //school info
        $form->schoolInfo()->update([
            'fullName' => $request->fullName,
            'type' => $request->type,
            'key' => $request->key,
            'director' => $request->director
        ]);

        $schoolInfo = $form->schoolInfo()->first();
        
        $address = json_decode($request->address, true);
        $schoolInfo->address()->update([
            'address' => $address['address'],
            'phone' => $address['phone'],
            'email' => $address['email']
        ]);

        $contact = json_decode($request->contact, true);
        $schoolInfo->contact()->update([
            'name' => $contact['name'],
            'phone' => $contact['phone'],
            'email' => $contact['email']
        ]);

        //groups
        $groups = json_decode($request->groups, true);

        $ids = array_map(function ($group) {
            return $group['id'] ?? null;
        }, $groups);
        
        $form->groups()->whereNotIn('id', $ids)->get()->each(function ($group) {
            $group->students()->delete();

            $group->teachers()->delete();

            $group->program()->delete();

            $group->lessons()->delete();

            $group->delete();
        });

        foreach($groups as $group) {
            $newGroup = $form->groups()->updateOrCreate(['id' => $group['id'] ?? null], [
                'class' => $group['class'],
                'lessons' => $group['lessons']
            ]);

            $ids = array_map(function ($student) {
                return $student['id'] ?? null;
            }, $group['students']);

            $newGroup->students()->whereNotIn('id', $ids)->delete();

            foreach($group['students'] as $student) {
                $newGroup->students()->updateOrCreate(['id' => $student['id'] ?? null], [
                    'name' => $student['name'],
                    'class' => $student['class']
                ]);
            }

            $ids = array_map(function ($teacher) {
                return $teacher['id'] ?? null;
            }, $group['teachers']);

            $newGroup->teachers()->whereNotIn('id', $ids)->delete();

            foreach($group['teachers'] as $teacher) {
                $newGroup->teachers()->updateOrCreate(['id' => $teacher['id'] ?? null], [
                    'teacher_id' => $teacher['value']
                ]);
            }

            $ids = array_map(function ($program) {
                return $program['id'] ?? null;
            }, $group['program']);

            $newGroup->program()->whereNotIn('id', $ids)->delete();

            foreach($group['program'] as $program) {
                $newProgram = $newGroup->program()->updateOrCreate(['id' => $program['id'] ?? null], [
                    'theme' => $program['theme'],
                    'lessons' => $program['allLessons'],
                    'remainingLessons' => $program['allLessons']
                ]);

                $ids = array_map(function ($programTeacher) {
                    return $programTeacher['id'] ?? null;
                }, $program['teachers']);

                $newProgram->teachers()->whereNotIn('id', $ids)->delete();

                foreach($program['teachers'] as $programTeacher) {
                    $newProgram->teachers()->updateOrCreate(['id' => $programTeacher['id'] ?? null], [
                        'lessons' => $programTeacher['lessons'],
                        'remainingLessons' => $programTeacher['lessons'],
                        'teacher_id' => $programTeacher['teacher_id']
                    ]);
                }
            }
        }

        //description
        $form->description()->update([
            'description' => $request->description,
            'goals' => $request->goals,
            'results' => $request->results,
            'indicatorsOfSuccess' => $request->indicatorsOfSuccess,
            'resources' => $request->resources
        ]);

        $description = $form->description()->first();
        $activities = json_decode($request->activities, true);

        $ids = array_map(function ($activity) {
            return $activity['id'] ?? null;
        }, $activities);

        $description->activities()->whereNotIn('id', $ids)->delete();

        foreach($activities as $activity) {
            $formDescriptionActivity = $description->activities()->updateOrCreate(['id' => $activity['id'] ?? null], [
                'activity' => $activity['activity'],
                'date' => $activity['date']
            ]);

            $ids = array_map(function ($teacher) {
                return $teacher['id'] ?? null;
            }, $activity['teachers']);

            $formDescriptionActivity->teachers()->whereNotIn('id', $ids)->delete();

            foreach($activity['teachers'] as $teacher) {
                $formDescriptionActivity->teachers()->updateOrCreate(['id' => $teacher['id'] ?? null], [
                    'teacher_id' => $teacher['value']
                ]);
            }
        }

        //budget
        $budgetObj = json_decode($request->budget, true);
        $form->budget()->update([
            'hourPrice' => $budgetObj['hourPrice'],
            'trainingCosts' => $budgetObj['trainingCosts'],
            'administrationCosts' => $budgetObj['administrationCosts']
        ]);

        $budget = $form->budget()->first();

        $ids = array_map(function ($teacher) {
            return $teacher['id'] ?? null;
        }, $budgetObj['teachers']);

        $budget->teachers()->whereNotIn('id', $ids)->delete();

        foreach($budgetObj['teachers'] as $teacher) {
            $budget->teachers()->updateOrCreate(['id' => $teacher['id'] ?? null], [
                'lessons' => $teacher['lessons'],
                'teacher_id' => $teacher['teacher_id']
            ]);
        }

        if(count($budgetObj['administration']) > 0) {
            $ids = array_map(function ($administration) {
                return $administration['id'] ?? null;
            }, $budgetObj['administration']);

            $budget->administration()->whereNotIn('id', $ids)->delete();

            foreach($budgetObj['administration'] as $administration) {
                $budget->administration()->updateOrCreate(['id' => $administration['id'] ?? null], [
                    'activity' => $administration['activity'],
                    'cost' => $administration['cost']
                ]);
            }
        }else {
            $budget->administration()->delete();
        }

        //additional
        $declarations = $request->file('declarations');
        
        $form->declarations()->get()->each(function ($declaration) {
            Storage::delete('public/' . $declaration->path);
            $declaration->delete();
        });

        foreach($declarations as $declaration) {
            $file_path = $declaration->store('declarations', 'public');

            $form->declarations()->create(['path' => $file_path]);
        }

        $letters = json_decode($request->letters, true);

        $ids = array_map(function ($letter) {
            return $letter['id'] ?? null;
        }, $letters);

        $form->letters()->whereNotIn('id', $ids)->with(['files'])->get()->each(function ($letter) {
            $letter->files->each(function ($file) {
                Storage::delete('public/' . $file->path);
                $file->delete();
            });

            $letter->delete();
        });

        foreach($letters as $key=>$letter) {
            $newLetter = $form->letters()->updateOrCreate(['id' => $letter['id'] ?? null], [
                'letter' => $letter['letter'],
                'teacher_id' => $letter['teacher_id'],
            ]);

            $newLetter->files()->get()->each(function ($file) {
                Storage::delete('public/' . $file->path);
                $file->delete();
            });

            if(request('lettersFiles.' . $key . '.files')) {
                $letter_files = $request->file('lettersFiles.' . $key . '.files');
            
                foreach($letter_files as $file) {
                    $file_path = $file->store('letters', 'public');

                    $newLetter->files()->create(['path' => $file_path]);
                }
            }
        }

        return $form;
    }

    public function delete(Request $request)
    {
        $ids = $request->selected;

        foreach($ids as $id) {
            $form = Form::findOrFail($id);

           $this->deleteForm($form);
        }

        return response()->json(['message' => 'Deleted'], 200);
    }

    public function getById($schoolId, $id)
    {
        $form = $this->getForms($schoolId, $id);

        return $form;
    }

    public function submit(Request $request)
    {
        $ids = $request->selected;

        foreach($ids as $id) {
            $form = Form::findOrFail($id);

            $form->settings()->update(['submitted' => true]);
        }

        return response()->json(['message' => 'Submitted'], 200); 
    }

    public function changePermissions(Request $request, $schoolId, $id)
    {
        $form = Form::findOrFail($id);

        if($request->has('edit')) {
            $form->settings()->update(['edit' => $request->edit]);
        }

        if($request->has('delete')) {
            $form->settings()->update(['delete' => $request->delete]);
        }

        return $form;
    }
}
