export default function fileMimeType(fileName) {
    const extension = fileName.split('.').pop();

    if(extension === 'doc') {
        return 'application/msword';
    }else if(extension === 'docx') {
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }else if(extension === 'pdf') {
        return 'application/pdf';
    }else {
        return 'text/plain'
    }
}