import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Settings2, CreditCard } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../ui/select";



interface PaymentSettings {
  provider: string;
  account: string;
  priceAmount: string;
  currency: string;
  buttonLabel: string;
  successMessage: string;
}

const PaymentNode: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<PaymentSettings>({
    provider: 'Stripe',
    account: '',
    priceAmount: '30.00',
    currency: 'USD',
    buttonLabel: 'Pay',
    successMessage: 'Success',
  });

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

  return (
    <div className="relative min-w-[250px] shadow-lg rounded-md border-2 border-yellow-300 bg-white">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-yellow-400" />
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-yellow-500" />
            <h3 className="text-sm font-medium text-gray-700">Payment</h3>
          </div>
          <button onClick={() => setOpen(true)} className="p-1 hover:bg-gray-100 rounded-full">
            <Settings2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Amount:</span>
            <span className="text-sm font-medium">{settings.priceAmount} {settings.currency}</span>
          </div>
          <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600">
            {settings.buttonLabel}
          </button>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-yellow-400" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Settings</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Provider:</label>
              <Select
                value={settings.provider}
                onValueChange={(value: string) => setSettings(prev => ({...prev, provider: value}))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Stripe">Stripe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Account:</label>
              <button 
                className="w-full px-3 py-2 text-sm border rounded-md text-gray-500 hover:bg-gray-50"
                onClick={() => alert('Add Stripe account')}
              >
                + Add Stripe account
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Price amount:</label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.priceAmount}
                  onChange={(e) => setSettings(prev => ({...prev, priceAmount: e.target.value}))}
                  className="w-full px-3 py-2 text-sm border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Currency:</label>
                <Select
                  value={settings.currency}
                  onValueChange={(value: string) => setSettings(prev => ({...prev, currency: value}))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map(currency => (
                      <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Button label:</label>
              <input
                type="text"
                value={settings.buttonLabel}
                onChange={(e) => setSettings(prev => ({...prev, buttonLabel: e.target.value}))}
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Success message:</label>
              <input
                type="text"
                value={settings.successMessage}
                onChange={(e) => setSettings(prev => ({...prev, successMessage: e.target.value}))}
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentNode;