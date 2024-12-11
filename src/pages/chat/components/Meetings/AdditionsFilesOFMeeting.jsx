import React from 'react';
import DefaultModal from "../../../../modals/DefaultModal";

function AdditionsFilesOfMeeting(props) {
    const File = () => {
        return (
            <div className={"w-[48%]"}>
                <div className={"flex justify-center"}>
                    <img
                        alt={"img"}
                        src={"https://s3-alpha-sig.figma.com/img/2365/b25c/f76b9786e637f70bd7ac47e638444fd5?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CBaaGlJ2-0Hq74dZ-ydLVvOOn~MwPZbamQpZ11R50XEfBxpkiXZQFuuUXKiG-MLc8KGcBLV~A9sN5uKPQ5hdv4zI6qwmd~Aq3rp83VMG9HeKB3cfMR2-fs8zFw6TypkSFL5DFDYPYnV6OdVbXNYCnGLzgOjEH~KepNYDy1S~g-bXn4B0d4NqdV2-vk4xgRNca5DoAIO~BXFCl41j2TqShBpObHkBwP~xvH5reUhNkxUQzNqpQMll3ThKRNbeK3R~TMf2WZ-U9zKMzN4Ka4SO~hAwNHx75GPJmaWonN1sEjAGA9gxrmikpmdb6V4i3DgIoKXRnNvNDDJTlYh3wlOpYA__"}
                        className={"w-[40px] h-[40px]"}
                    />
                </div>
                <p className={"text-center"}>ملف 1.Txt</p>
            </div>
        )
    }
    return (
        <DefaultModal
            classNameModal={"w-full md:w-[35%] border border-[#49869633] rounded-2xl px-10 py-8 justify-center"}
            isModalOpen={props.isModalOpen}
            onClose={props.onClose}
            isTitle={false}
        >
            <div className={"w-full flex flex-wrap bg-white gap-2 justify-center"}>
                <File/>
                <File/>
                <File/>
                <File/>
            </div>
        </DefaultModal>
    );
}

export default AdditionsFilesOfMeeting;