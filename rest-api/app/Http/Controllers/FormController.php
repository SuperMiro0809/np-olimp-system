<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{
    Form,
    FormBudget,
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
                    'group_id' => $newGroup->id
                ]);

                foreach($program['teachers'] as $programTeacher) {
                    GroupProgramTeacher::create([
                        'lessons' => $programTeacher['lessons'],
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
                'form_id' => $form->id
            ]);

            $letter_files = $request->file('lettersFiles.' . $key . '.files');
        
            foreach($letter_files as $file) {
                $file_path = $file->store('letters', 'public');

                FormLetterFile::create([
                    'path' => $file_path,
                    'letter_id' => $newLetter->id,
                ]);
            }
        }

        return $form;
    }
}
