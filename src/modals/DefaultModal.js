import React from 'react';

function DefaultModal({
                          isModalOpen,
                          classNameModal,
                          isTitle = true,
                          title,
                          onClose,
                          classNameContener,
                          children,
                      }) {
    const handleOverlayClick = (event) => {
        // Check if the click target is the overlay itself
        if (event.target.id === 'add-department-modal') {
            onClose(); // Call onClose if overlay is clicked
        }
    };

    return (
        <div
            id="add-department-modal"
            tabIndex="-1"
            aria-hidden="true"
            className={`${isModalOpen ? 'flex' : 'hidden'} fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full font-family-primary  ${classNameContener ? classNameContener : 'bg-black bg-opacity-50'}`}
            onClick={handleOverlayClick} // Add onClick handler to the overlay
        >
            <div className="relative p-4 w-full max-h-full flex justify-center">
                <div
                    className={`relative bg-white rounded-lg shadow dark:bg-gray-700 ${classNameModal}`}
                    onClick={(e) => e.stopPropagation()} // Stop click propagation on modal content
                >
                    {isTitle && (
                        <div
                            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="mr-3 text-lg font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h3>
                        </div>
                    )}
                    <button
                        type="button"
                        className="absolute top-2 left-2 z-10 cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onClose}
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>

                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultModal;
