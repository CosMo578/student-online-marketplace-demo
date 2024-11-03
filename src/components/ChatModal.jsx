"use state";
import { Modal } from "flowbite-react";
import { Send, X } from "lucide-react";
import { useState } from "react";

const ChatMessage = ({ msg, username, isSender }) => {
  let myMessage = isSender
    ? "justify-self-end flex-row-reverse"
    : "justify-self-start";
  let chatDesign = isSender ? "rounded-br-none" : "rounded-bl-none";

  return (
    <div className={`flex items-center gap-4 ${myMessage}`}>
      <div
        className={`max-w-[70%] space-y-1.5 rounded-[6rem] bg-primary px-6 py-3 text-white ${chatDesign}`}
      >
        <p className="text-md font-bold">{username}</p>
        <p>{msg}</p>
      </div>
    </div>
  );
};

const PopupModal = ({
  openModal,
  setOpenModal,
  productName,
  productPrice,
  buyerId,
  sellerId,
}) => {
  const [newMessages, setNewMessages] = useState("");

  return (
    <Modal
      className="relative overflow-hidden"
      show={openModal}
      onClose={() => setOpenModal(false)}
    >
      <div className="flex items-stretch justify-between border-b p-6 pt-12">
        <h1 className="text-xl font-medium">
          <span>{productName}</span>,<span> NGN {productPrice}</span>
        </h1>

        <div className="rounded-lg bg-primary px-3 py-1.5 font-medium text-white">
          Mark Completed
        </div>

        {/* <button>Rate Seller</button> */}

        <div
          className="absolute right-0 top-0 cursor-pointer rounded-tr-lg bg-gray-200 px-3 py-1.5 text-center text-primary hover:bg-gray-400 hover:text-white"
          onClick={() => setOpenModal(false)}
        >
          <X />
        </div>
      </div>

      <Modal.Body>
        <ChatMessage msg="Hello wasup" username="Raphael" isSender={true} />
        <ChatMessage msg="I am Good" username="cosMo" isSender={false} />
      </Modal.Body>

      <Modal.Footer>
        <form
          className="flex w-full items-center gap-3"
          onSubmit={(e) => sendMessages(e)}
        >
          <input
            className="w-full rounded-full border-primary p-3 pl-6"
            type="text"
            value={newMessages}
            placeholder="Message"
            onChange={(e) => setNewMessages(e.target.value)}
            required
          />
          <button
            className="rounded-full bg-primary p-4 font-medium text-white"
            type="submit"
          >
            <Send />
          </button>
        </form>
      </Modal.Footer>
    </Modal>
  );
};
export default PopupModal;
