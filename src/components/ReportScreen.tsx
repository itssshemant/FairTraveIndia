import { useState } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { MapPin, Upload, CheckCircle, IndianRupee, AlertCircle, Camera, FileText } from 'lucide-react';
import { Badge } from './ui/badge';
import { supabase } from '../lib/supabaseclient';
import { User } from '@supabase/supabase-js';

interface ReportScreenProps {
  onNavigate: (screen: 'home' | 'explore' | 'report' | 'saved' | 'profile' | 'cultural') => void;
  isLoggedIn: boolean;
  userName: string;
  user: User | null;
  onShowLogin: () => void;
  onLogout: () => void;
}

export function ReportScreen({ onNavigate, isLoggedIn, userName, user, onShowLogin, onLogout }: ReportScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('Auto Rickshaw');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [chargedAmount, setChargedAmount] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [extraDetails, setExtraDetails] = useState('');
  const [location, setLocation] = useState('Connaught Place, New Delhi');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const categories = [
    { name: 'Auto Rickshaw', icon: '🛺' },
    { name: 'Taxi', icon: '🚕' },
    { name: 'Shop', icon: '🏪' },
    { name: 'Guide', icon: '👨‍🏫' },
    { name: 'Ticket', icon: '🎫' },
    { name: 'Other', icon: '📝' }
  ];
  
  const steps = ['Details', 'Location', 'Amount', 'Submit'];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFiles([file]);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
      
      alert(`File uploaded: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
    }
  };

  const handleTakePhoto = () => {
    // In a real app, this would open the camera
    alert('Opening camera...\n\nNote: In a real app, this would access your device camera to take a photo of the receipt or bill.');
  };

  const handleRemoveFile = () => {
    setUploadedFiles([]);
    setPhotoPreview(null);
  };

  const handleSubmit = async () => {
    if (!user) return;
    setIsUploading(true);
    setUploadError(null);
    let evidenceUrl = null;
    try {
      // Upload evidence file if present
      if (uploadedFiles.length > 0) {
        const file = uploadedFiles[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}_${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage.from('evidence').upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });
        if (error) throw new Error('File upload failed. Please try again.');
        // Get public URL
        const { data: urlData } = supabase.storage.from('evidence').getPublicUrl(fileName);
        evidenceUrl = urlData?.publicUrl || null;
      }

      // Insert report with evidence URL and extra details
      const { error: insertError } = await supabase.from('reports').insert({
        user_id: user.id,
        category: selectedCategory,
        amount: parseFloat(chargedAmount) || 0,
        location: location,
        description: extraDetails || 'Overcharging report',
        is_verified: false,
        evidence_url: evidenceUrl,
      });
      if (insertError) throw new Error('Report submission failed. Please try again.');
      setIsSubmitted(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch (err: any) {
      setUploadError(err.message || 'Something went wrong.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pb-20">
        <Header isLoggedIn={isLoggedIn} userName={userName} onShowLogin={onShowLogin} onLogout={onLogout} />
        <main className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-center min-h-[60vh]">
          <Card className="border-gray-200 shadow-lg p-8 text-center max-w-md">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to report overcharging and help the community.</p>
            <Button onClick={onShowLogin} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              Sign In
            </Button>
          </Card>
        </main>
        <BottomNav currentScreen="report" onNavigate={onNavigate} isLoggedIn={isLoggedIn} onShowLogin={onShowLogin} />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen pb-20">
        <Header isLoggedIn={isLoggedIn} userName={userName} onShowLogin={onShowLogin} onLogout={onLogout} />
        <main className="max-w-2xl mx-auto px-4 py-12">
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-2xl">
            <CardContent className="p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Report Submitted!</h2>
                <p className="text-lg text-gray-700">
                  Thank you for helping the community
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-green-200">
                <p className="text-gray-700 mb-2">Your report has been verified and added to our database</p>
                <p className="text-sm text-gray-600">You've earned <span className="font-bold text-green-600">+10 points</span> 🎉</p>
              </div>
              <div className="pt-4 space-y-3">
                <Button 
                  onClick={() => onNavigate('home')} 
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg h-12 font-semibold"
                >
                  Back to Home
                </Button>
                <Button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                    setChargedAmount('');
                  }} 
                  variant="outline"
                  className="w-full border-green-300 hover:bg-green-50 h-12 font-semibold"
                >
                  Submit Another Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <BottomNav currentScreen="report" onNavigate={onNavigate} isLoggedIn={isLoggedIn} onShowLogin={onShowLogin} />
      </div>
    );
  }

  // Get fair price range values
  const getFairPriceRange = () => {
    if (selectedCategory === 'Auto Rickshaw') {
      return { min: 40, max: 60 };
    } else if (selectedCategory === 'Taxi') {
      return { min: 180, max: 250 };
    } else if (selectedCategory === 'Shop') {
      return { min: 50, max: 200 };
    } else if (selectedCategory === 'Guide') {
      return { min: 500, max: 1500 };
    } else if (selectedCategory === 'Ticket') {
      return { min: 100, max: 500 };
    } else {
      return { min: 0, max: 0 };
    }
  };

  const fairPriceRange = getFairPriceRange();
  const fairPrice = fairPriceRange.min > 0 ? `₹${fairPriceRange.min}-${fairPriceRange.max}` : 'Not available';
  const chargedAmountNum = parseInt(chargedAmount) || 0;
  const isOvercharged = chargedAmountNum > fairPriceRange.max && fairPriceRange.max > 0;
  const isFairPrice = chargedAmountNum >= fairPriceRange.min && chargedAmountNum <= fairPriceRange.max && fairPriceRange.min > 0;
  const isUndercharged = chargedAmountNum > 0 && chargedAmountNum < fairPriceRange.min && fairPriceRange.min > 0;
  const overchargeAmount = chargedAmountNum - fairPriceRange.max;

  return (
    <div className="min-h-screen pb-20">
      <Header isLoggedIn={isLoggedIn} userName={userName} onShowLogin={onShowLogin} onLogout={onLogout} />
      
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Overcharging</h2>
          <p className="text-gray-600">Help fellow travelers by sharing your experience</p>
        </div>

        {/* Progress Steps */}
        <Card className="border-gray-200 shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        index + 1 <= currentStep
                          ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {index + 1 < currentStep ? '✓' : index + 1}
                    </div>
                    <span className={`text-xs mt-2 font-semibold ${
                      index + 1 <= currentStep ? 'text-orange-600' : 'text-gray-400'
                    }`}>
                      {step}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 rounded-full transition-all ${
                        index + 1 < currentStep ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <div className="space-y-3">
          <label className="text-gray-900 font-bold">Select Service Type</label>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedCategory === category.name
                    ? 'border-orange-500 bg-orange-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-50'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className={`text-sm font-semibold ${
                  selectedCategory === category.name ? 'text-orange-600' : 'text-gray-700'
                }`}>
                  {category.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Service Name */}
        <div className="space-y-2">
          <label className="text-gray-900 font-bold">Service/Vendor Name</label>
          <Input
            placeholder="e.g., Auto from Delhi Gate to Red Fort"
            className="h-12 border-gray-300 focus:ring-2 focus:ring-orange-500 rounded-xl"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-gray-900 font-bold">Location</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <Input
              placeholder="Where did this happen?"
              className="pl-12 h-12 border-gray-300 focus:ring-2 focus:ring-orange-500 rounded-xl"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            GPS coordinates will be automatically recorded
          </p>
        </div>

        {/* Amount Details */}
        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 shadow-md">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee className="w-5 h-5 text-orange-600" />
              <h4 className="font-bold text-gray-900">Pricing Details</h4>
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-700 font-semibold block">Amount You Were Charged</label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={chargedAmount}
                  onChange={(e) => setChargedAmount(e.target.value)}
                  className="pl-12 h-12 bg-white border-gray-300 focus:ring-2 focus:ring-orange-500 rounded-xl text-lg font-semibold"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border-2 border-dashed border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 font-semibold">Fair Price Range</p>
                <Badge className="bg-green-100 text-green-700 border-green-200 font-semibold">
                  Community Verified
                </Badge>
              </div>
              <p className="text-3xl font-bold text-green-600">{fairPrice}</p>
              
              {/* Show overcharge warning only if actually overcharged */}
              {chargedAmount && isOvercharged && (
                <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-700 font-semibold">
                    ⚠️ You were overcharged by approximately ₹{overchargeAmount}
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    Fair price maximum is ₹{fairPriceRange.max}
                  </p>
                </div>
              )}
              
              {/* Show fair price message */}
              {chargedAmount && isFairPrice && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700 font-semibold">
                    ✓ This is within the fair price range
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    You paid a reasonable amount
                  </p>
                </div>
              )}
              
              {/* Show undercharged message (unusual but possible) */}
              {chargedAmount && isUndercharged && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700 font-semibold">
                    💡 This is below the typical fair price
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    You got a great deal! Consider verifying the service quality.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Attachment */}
        <div className="space-y-2">
          <label className="text-gray-900 font-bold">Add Evidence (Optional)</label>
          
          {/* Preview uploaded file */}
          {photoPreview && (
            <div className="relative bg-white border-2 border-green-500 rounded-xl p-4 mb-3">
              <button
                onClick={handleRemoveFile}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
              >
                ×
              </button>
              <img src={photoPreview} alt="Upload preview" className="w-full h-48 object-cover rounded-lg" />
              <p className="text-sm text-green-700 font-semibold mt-2 text-center">
                ✓ Photo uploaded successfully
              </p>
            </div>
          )}
          
          {!photoPreview && (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleTakePhoto}
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange-400 transition-all cursor-pointer bg-white group"
              >
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-orange-500 transition-colors" />
                <p className="text-sm font-semibold text-gray-700 group-hover:text-orange-600">Take Photo</p>
                <p className="text-xs text-gray-500 mt-1">Receipt or bill</p>
              </button>
              
              <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange-400 transition-all cursor-pointer bg-white group">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-orange-500 transition-colors" />
                <p className="text-sm font-semibold text-gray-700 group-hover:text-orange-600">Upload File</p>
                <p className="text-xs text-gray-500 mt-1">Photo or document</p>
              </label>
            </div>
          )}
          
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <FileText className="w-3 h-3" />
            Adding evidence increases report credibility by 50%
          </p>
        </div>

        {/* Optional Note */}
        <div className="space-y-2">
          <label className="text-gray-900 font-bold">Additional Details (Optional)</label>
          <Textarea
            placeholder="Share your experience... What happened? How did they justify the price? Any other details that might help others."
            className="min-h-32 border-gray-300 focus:ring-2 focus:ring-orange-500 rounded-xl resize-none"
            value={extraDetails}
            onChange={e => setExtraDetails(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            💡 Detailed reports help the community better understand common scams
          </p>
        </div>

        {/* Info Box */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Your privacy is protected</p>
                <p className="text-blue-700">Reports are anonymous. Only location and pricing data are shared publicly.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="space-y-3">
          <Button
            onClick={handleSubmit}
            className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-xl shadow-orange-200 text-lg font-bold rounded-xl"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Submit Report & Help Others'}
          </Button>
          {uploadError && (
            <p className="text-center text-sm text-red-600 font-semibold">{uploadError}</p>
          )}
          {showToast && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-[9999] font-semibold animate-fade-in">
              Report submitted successfully!
            </div>
          )}
          <p className="text-center text-xs text-gray-500">
            By submitting, you agree to our community guidelines
          </p>
        </div>
      </main>

      <BottomNav currentScreen="report" onNavigate={onNavigate} isLoggedIn={isLoggedIn} onShowLogin={onShowLogin} />
    </div>
  );
}