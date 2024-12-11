import React from 'react';
import { useDropzone } from 'react-dropzone';
import './FolderUploader.css'; // استيراد ملف CSS المخصص

function FolderUploader(props) {
    const onDrop = props.onDrop
    const acceptedFiles = props.acceptedFiles

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
        webkitdirectory: true,
    });

    const displayedFiles = acceptedFiles.slice(0, 2);

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-4 text-center" {...getRootProps()}>
                <input {...getInputProps()} />
                {acceptedFiles.length === 0 ? (
                    <p className="text-base text text-yellow-500">قم بإسقاط الملفات أو المجلدات هنا، أو انقر لتحديدها</p>
                ) : (
                    <></>
                )}

                <div>
                    {displayedFiles.length > 0 && (
                        <div>
                            <p>
                                {displayedFiles.map((file, index) => (
                                    <span key={index} className="mx-2">
                                        {file.name}
                                    </span>
                                ))}
                            </p>
                            {acceptedFiles.length > displayedFiles.length && (
                                <p>و {acceptedFiles.length - displayedFiles.length} ملفات أخرى</p>
                            )}
                        </div>
                    )}
                    <p>عدد جميع الملفات: {acceptedFiles.length}</p>
                </div>
            </div>
        </div>
    );
}

export default FolderUploader;
