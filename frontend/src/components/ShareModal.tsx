import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { QRCodeCanvas as QRCode } from "qrcode.react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface ShareModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    shareLink: string;
}

const ShareModal = ({ open, onOpenChange, shareLink }: ShareModalProps) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(shareLink);
        toast.success("Link copiado para a área de transferência!");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Compartilhar Lista de Favoritos</DialogTitle>
                    <DialogDescription>
                        Qualquer pessoa com este link poderá ver sua lista.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center gap-4 p-4">
                    <div className="rounded-lg bg-white p-4">
                        <QRCode value={shareLink} size={192} />
                    </div>
                    <div className="relative flex w-full items-center">
                        <Input id="share-link" value={shareLink} readOnly className="pr-12" />
                        <Button type="button" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleCopy} >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ShareModal;