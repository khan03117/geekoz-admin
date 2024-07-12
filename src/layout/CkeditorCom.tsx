import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
interface CKEditorComponentProps {
    value: string;
    onChange: (value: string) => void;
}
const CkeditorCom: React.FC<CKEditorComponentProps> = ({ value, onChange }) => {

    return (
        <>
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={(event, editor) => {
                    console.log(event)
                    const data = editor.getData();
                    onChange(data);
                }}
            />
        </>
    )
}

export default CkeditorCom
