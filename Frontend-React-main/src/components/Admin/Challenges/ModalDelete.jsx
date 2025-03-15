

const ModalDelete = () => {
  return (
      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box text-center mx-auto">
              <div className="w-full flex justify-center">
                  <img src={warningIcon} alt="warning-icon" />
              </div>
              <h1 className="font-bold text-2xl text-[#1F2937] mt-5 mb-3">Hapus Produk</h1>
              <p className="text-[#6B7280] text-base font-medium max-w-[310px] mx-auto">Apa kamu yakin ingin menghapus produk ini ?</p>
              <div className="flex flex-row gap-3 justify-center mt-5">
                  <button
                      className="btn btn-success btn-outline !border-[#2E7D32] !text-[#2E7D32] px-12 hover:!text-white hover:!bg-[#2E7D32]"
                      onClick={() => {
                          handleDelete(data); // Kirim ID produk untuk dihapus
                          handleClose();
                      }}
                  >
                      Ya
                  </button>
                  <button className="btn btn-success !text-white !bg-[#2E7D32] border-[#2E7D32] px-9" onClick={handleClose}>
                      Tidak
                  </button>
              </div>
          </div>
      </dialog>
  );
}

export default ModalDelete