import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { toast } from "react-toastify";

const ROYALTY = process.env.NEXT_PUBLIC_ROYALTY_WALLET;
const ROYALTY_PERCENTAGE = process.env.NEXT_PUBLIC_ROYALTY_PERCENTAGE;

const createTransaction = async (
  publicKey,
  connection,
  sendTransaction,
  winners
) => {
  try {
    if (!publicKey) throw new WalletNotConnectedError();

    const transaction = new Transaction();

    let x = 0;

    winners.forEach((element) => {
      const tx1 = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(element.wallet),
        lamports: element.amount * LAMPORTS_PER_SOL,
      });
      x += element.amount;
      transaction.add(tx1);
    });

    // royalty payment
    x *= ROYALTY_PERCENTAGE;
    x = x.toFixed(4);

    const tx1 = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new PublicKey(ROYALTY),
      lamports: x * LAMPORTS_PER_SOL,
    });

    transaction.add(tx1);

    const signature = await sendTransaction(transaction, connection);

    await connection.confirmTransaction(signature, "processed");

    toast.success("Transaction Sucessful", {
      position: "bottom-left",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return true;
  } catch (e) {
    // eslint-disable-next-line no-alert
    console.log(e);

    toast.error("Error sending transaction", {
      position: "bottom-left",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return false;
  }
};

export default createTransaction;
