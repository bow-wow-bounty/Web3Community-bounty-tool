import { AnchorProvider, BN, Program, web3 } from "@project-serum/anchor";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const network = WalletAdapterNetwork.Mainnet;

const MULTISIG_PROGRAM_ID = process.env.NEXT_PUBLIC_MULTISIG_PROGRAM_ID;
const MULTISIG_PUBLIC_KEY = new PublicKey(
  process.env.NEXT_PUBLIC_MULTISIG_PUBLIC_KEY
);

const createMultisigTransaction = async (wallet, receiver, amount) => {
  try {
    const connection = new Connection(clusterApiUrl(network), "confirmed");

    const provider = new AnchorProvider(connection, wallet, {
      skipPreflight: true,
    });

    const multisigProgram = await Program.at(MULTISIG_PROGRAM_ID, provider);

    const [multisigSigner] = await web3.PublicKey.findProgramAddress(
      [MULTISIG_PUBLIC_KEY.toBuffer()],
      multisigProgram.programId
    );

    const receiverPublicKey = new PublicKey(receiver);

    const proposedIx = web3.SystemProgram.transfer({
      fromPubkey: multisigSigner,
      toPubkey: receiverPublicKey,
      lamports: new BN(amount * web3.LAMPORTS_PER_SOL),
    });

    const proposedIxAccounts = [
      {
        pubkey: multisigSigner,
        isWritable: false,
        isSigner: true,
      },
      {
        pubkey: receiverPublicKey,
        isWritable: true,
        isSigner: false,
      },
    ];

    const txAccountKeypair = web3.Keypair.generate();
    const txAccountPublicKey = txAccountKeypair.publicKey;
    const txSize = 1000;

    return multisigProgram.rpc.createTransaction(
      proposedIx.programId,
      proposedIxAccounts,
      proposedIx.data,
      {
        accounts: {
          multisig: MULTISIG_PUBLIC_KEY,
          transaction: txAccountPublicKey,
          proposer: provider.wallet.publicKey,
        },
        instructions: [
          await multisigProgram.account.transaction.createInstruction(
            txAccountKeypair,
            txSize
          ),
        ],
        signers: [txAccountKeypair],
      }
    );
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e.message);
    return false;
  }
};

export default createMultisigTransaction;
