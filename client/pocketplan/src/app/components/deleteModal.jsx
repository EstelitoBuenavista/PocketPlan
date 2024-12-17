// components/deleteModal (so far called from delete category only)
'use client';

function NewAccModal({ onClose, onDelete }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="modal-box bg-base-100 text-neutral relative p-8">
          <h3 className="font-bold text-xl sm:text-lg">Are you sure?</h3>
          <p className="py-2 text-sm sm:text-base">Continue to proceed deletion.</p>

          <div className="modal-action flex items-center justify-between flex-wrap">
            <button className="btn btn-accent btn-md" onClick={onClose}>
              Cancel
            </button>
            {/* IF continue then append the new account into the list */}
            <button 
              className="btn btn-primary btn-md" 
              onClick={onDelete}
              // logic for deleting a category on click of continue
              // onClick={(e) => {handleSubmit(e);onClose()}}
            >
              Continue
            </button>
          </div>
        </div>
      
    </div>
  );
}

export default NewAccModal;