
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  time: string;
  from: string;
  to: string;
}

const QRCodeModal = ({
  isOpen,
  onClose,
  bookingId,
  time,
  from,
  to
}: QRCodeModalProps) => {
  // This would be generated from the backend in a real app
  // For now, just showing a placeholder SVG that represents a QR code
  const qrCodePlaceholder = (
    <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto my-4">
      <rect x="0" y="0" width="200" height="200" fill="#ffffff" />
      <rect x="16" y="16" width="40" height="40" fill="#000000" />
      <rect x="144" y="16" width="40" height="40" fill="#000000" />
      <rect x="16" y="144" width="40" height="40" fill="#000000" />
      <rect x="56" y="56" width="88" height="88" fill="#ffffff" />
      <rect x="72" y="72" width="56" height="56" fill="#000000" />
      <rect x="88" y="16" width="8" height="8" fill="#000000" />
      <rect x="104" y="16" width="8" height="8" fill="#000000" />
      <rect x="64" y="40" width="8" height="8" fill="#000000" />
      <rect x="128" y="40" width="8" height="8" fill="#000000" />
      <rect x="168" y="64" width="8" height="8" fill="#000000" />
      <rect x="16" y="96" width="8" height="8" fill="#000000" />
      <rect x="32" y="120" width="8" height="8" fill="#000000" />
      <rect x="168" y="128" width="8" height="8" fill="#000000" />
      <rect x="64" y="168" width="8" height="8" fill="#000000" />
      <rect x="104" y="176" width="8" height="8" fill="#000000" />
      <rect x="152" y="176" width="8" height="8" fill="#000000" />
    </svg>
  );
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Your Bus Ticket</DialogTitle>
        </DialogHeader>
        
        <div className="p-4 border border-dashed border-gray-300 rounded-lg">
          {qrCodePlaceholder}
          
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">Scan this code when boarding</p>
            <p className="text-xs text-gray-500 mt-1">Booking ID: {bookingId}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{time}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">From:</span>
              <span className="font-medium">{from}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">To:</span>
              <span className="font-medium">{to}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
