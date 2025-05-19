import ClickAwayListener from "@mui/material/ClickAwayListener";

export function DeleteAccountModal({ onClose, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-xs z-50 animate-fade-in ">
      <ClickAwayListener onClickAway={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
          <h6 className="font-semibold text-xl mb-4 text-center text-[#1e272e]">
            ¿Estás seguro?
          </h6>
          <p className="text-gray-700 text-md mb-6 text-center">
            Esta acción desactivará tu cuenta y no podrás volver a acceder.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md text-[#1e272e] font-medium hover:bg-gray-100"
            >
              Cancelar
            </button>

            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-[#0097e6] text-white font-semibold rounded-md shadow hover:bg-[#007bb5] disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Desactivando..." : "Desactivar cuenta"}
            </button>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
}
