import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { analysisService } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  Info, 
  Lightbulb, 
  Loader2, 
  MessageSquare, 
  Plus, 
  Search, 
  Send, 
  ShieldAlert, 
  Stethoscope, 
  Upload, 
  Zap
} from "lucide-react";

const Analysis: React.FC = () => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [chatAnswer, setChatAnswer] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Medical Report Analysis | SevaSetu AI";
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setChatAnswer(null);
    setReportData(null);
    toast.info("Seva AI is carefully reviewing your report...");

    try {
      const data = await analysisService.analyzeReport(file, user?.id || "anonymous_user");
      setReportData(data);
      toast.success("Analysis complete! See insights below.");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error connecting to Seva AI. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim() || !reportData) return;

    setIsAsking(true);
    try {
      const context = reportData.summary_full || reportData.summary || "Medical report scan";
      const data = await analysisService.chatWithReport(question, context, user?.id || "anonymous_user");
      setChatAnswer(data.response);
      setQuestion("");
    } catch (error) {
      toast.error("Failed to get answer from Seva AI.");
    } finally {
      setIsAsking(false);
    }
  };

  const getStatusColor = (status: string) => {
    const s = status?.toUpperCase();
    if (s === 'HIGH' || s === 'LOW' || s === 'ABNORMAL') return "bg-destructive/15 text-destructive border-destructive/20";
    if (s === 'INFO') return "bg-blue-500/15 text-blue-600 border-blue-200";
    return "bg-emerald-500/15 text-emerald-600 border-emerald-200";
  };

  const getStatusIcon = (status: string) => {
    const s = status?.toUpperCase();
    if (s === 'HIGH' || s === 'LOW' || s === 'ABNORMAL') return <AlertCircle className="w-3.5 h-3.5" />;
    if (s === 'INFO') return <Info className="w-3.5 h-3.5" />;
    return <CheckCircle2 className="w-3.5 h-3.5" />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <div className="container mx-auto px-4 pt-12 pb-8 lg:py-12 max-w-7xl animate-in fade-in duration-700">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-slate-900 mb-2 flex items-center gap-3">
              <span className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/20">
                <Stethoscope className="w-8 h-8" />
              </span>
              AI Report Analysis
            </h1>
            <p className="text-slate-500 font-medium">Empowering rural health with intelligent report scanning</p>
          </div>
          
          <button 
            onClick={handleUploadClick}
            disabled={isUploading}
            className="group flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-600 px-5 py-3 rounded-2xl font-bold text-slate-700 transition-all shadow-sm hover:shadow-md active:scale-95 disabled:opacity-50"
          >
            {isUploading ? <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> : <Upload className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />}
            {reportData ? "Upload New Report" : "Select Medical Report"}
          </button>
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*,application/pdf"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Document Preview Side */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-8">
            <Card className="overflow-hidden border-none shadow-2xl shadow-slate-200/50 bg-white rounded-3xl group">
              <CardHeader className="bg-slate-50/80 border-b border-slate-100 py-4 px-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold flex items-center gap-2 text-slate-600 uppercase tracking-widest">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Medical Document
                  </h3>
                  {selectedImage && <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100">OCR Ready</Badge>}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div 
                  onClick={!selectedImage ? handleUploadClick : undefined}
                  className={`aspect-[3/4] bg-slate-100 flex items-center justify-center relative overflow-hidden ${!selectedImage ? 'cursor-pointer hover:bg-slate-200/50' : ''} transition-colors`}
                >
                  {selectedImage ? (
                    <img 
                      className="w-full h-full object-contain p-2 animate-in zoom-in-95 duration-500" 
                      alt="Uploaded medical document" 
                      src={selectedImage}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-6 p-12 text-center text-slate-400 group-hover:text-blue-600 transition-colors">
                      <div className="p-8 rounded-[2.5rem] bg-white shadow-xl shadow-slate-200 group-hover:shadow-blue-600/10 group-hover:scale-105 transition-all duration-500">
                        {isUploading ? <Loader2 className="w-12 h-12 animate-spin" /> : <Plus className="w-12 h-12" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-800 mb-2">Scan Your Report</h4>
                        <p className="text-sm px-4">Upload an image of your blood test, prescription, or X-ray for instant analysis.</p>
                      </div>
                    </div>
                  )}
                  
                  {isUploading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center animate-pulse">
                      <Zap className="w-12 h-12 text-blue-600 animate-bounce mb-4" />
                      <p className="font-black text-blue-600 uppercase tracking-[0.2em] text-xs">AI Processing...</p>
                    </div>
                  )}
                </div>
              </CardContent>
              {selectedImage && (
                <CardFooter className="bg-slate-50/50 p-4 flex justify-center">
                  <button onClick={handleUploadClick} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                    <Upload className="w-3 h-3" /> Change Document
                  </button>
                </CardFooter>
              )}
            </Card>
          </div>

          {/* Analysis View Side */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {!reportData && !isUploading ? (
              <div className="bg-white rounded-[2.5rem] p-12 md:p-20 flex flex-col items-center text-center space-y-8 border-2 border-dashed border-slate-200 shadow-sm animate-in slide-in-from-right-10 duration-700">
                <div className="p-10 rounded-full bg-slate-50 text-slate-300 relative">
                  <Activity className="w-20 h-20" />
                  <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white animate-pulse">
                    <Plus className="w-5 h-5" />
                  </div>
                </div>
                <div className="max-w-md">
                  <h3 className="text-2xl font-black text-slate-800 mb-4">Start Your AI Scan</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    Our AI models (Seva AI) can interpret medical reports in English, Hindi, Marathi, and other regional languages. Simply upload a photo to begin.
                  </p>
                </div>
                <button 
                  onClick={handleUploadClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 hover:scale-[1.02] transition-all active:scale-95"
                >
                  Upload My First Report
                </button>
              </div>
            ) : reportData ? (
              <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-1000">
                
                {/* Main Summary Card */}
                <Card className="border-none shadow-2xl shadow-slate-200/50 bg-white rounded-3xl overflow-hidden">
                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-400 flex items-center justify-center text-white shadow-xl rotate-3">
                        <Activity className="w-8 h-8" strokeWidth={3} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-slate-900 leading-tight">Medical Insight Report</h2>
                        <div className="flex items-center gap-2">
                           <Badge className="bg-emerald-50 text-emerald-600 border-none px-2 py-0 text-[10px] font-black uppercase tracking-wider">Analysis Complete</Badge>
                           <span className="text-slate-300">•</span>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Powered by Seva AI</span>
                        </div>
                      </div>
                    </div>

                    <Tabs defaultValue="summary" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1.5 h-14 rounded-2xl mb-8">
                        <TabsTrigger value="summary" className="rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm text-slate-500 data-[state=active]:text-blue-600">Executive Summary</TabsTrigger>
                        <TabsTrigger value="details" className="rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm text-slate-500 data-[state=active]:text-blue-600">Detailed Breakdown</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="summary" className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                        <div className="bg-slate-50/80 rounded-3xl p-6 md:p-8 border border-slate-100">
                          <p className="text-lg md:text-xl text-slate-700 font-bold leading-relaxed italic">
                            "{reportData.summary}"
                          </p>
                          {reportData.detailed_explanation && (
                            <p className="mt-4 text-slate-600 leading-relaxed font-medium">
                              {reportData.detailed_explanation}
                            </p>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="details" className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                         {/* Abnormalities List */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {reportData.abnormalities && reportData.abnormalities.length > 0 ? (
                             reportData.abnormalities.map((item: any, idx: number) => (
                               <Card key={idx} className="border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden">
                                 <div className="p-5 space-y-3">
                                   <div className="flex justify-between items-center">
                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{item.name}</span>
                                     <Badge variant="outline" className={`${getStatusColor(item.status)} border-none text-[9px] font-black uppercase flex items-center gap-1`}>
                                       {getStatusIcon(item.status)}
                                       {item.status}
                                     </Badge>
                                   </div>
                                   <div className="text-xl font-black text-slate-900">{item.value}</div>
                                   <p className="text-xs text-slate-500 font-medium leading-normal">{item.explanation}</p>
                                 </div>
                               </Card>
                             ))
                           ) : (
                             <div className="col-span-2 py-8 bg-emerald-50/50 rounded-2xl flex flex-col items-center justify-center text-center border border-emerald-100">
                               <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-3" />
                               <p className="font-bold text-emerald-700">All scanned parameters appear within normal limits.</p>
                             </div>
                           )}
                         </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </Card>

                {/* Recommendations Section */}
                {reportData.recommendations && reportData.recommendations.length > 0 && (
                  <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl overflow-hidden">
                    <CardHeader className="pt-8 px-8 pb-4">
                      <CardTitle className="text-xl font-black flex items-center gap-3">
                        <Lightbulb className="w-6 h-6 text-yellow-400" />
                        Next Steps & Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-10">
                      <div className="space-y-4">
                        {reportData.recommendations.map((rec: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                              <span className="text-xs font-black">{idx + 1}</span>
                            </div>
                            <p className="text-sm md:text-base font-bold text-slate-100">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Q&A Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 px-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    Ask a Follow-up Question
                  </h3>
                  
                  <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white">
                    <CardContent className="p-4 md:p-6 space-y-6">
                      
                      {chatAnswer && (
                        <div className="bg-blue-600/5 border border-blue-600/20 p-6 rounded-2xl relative animate-in zoom-in-95 duration-400">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 mt-1 shadow-lg shadow-blue-600/20">
                              <MessageSquare className="w-5 h-5" />
                            </div>
                            <div className="space-y-3">
                              <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Seva AI Responds</h5>
                              <p className="text-slate-800 text-base font-bold leading-relaxed italic">"{chatAnswer}"</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-600/5 transition-all">
                        <div className="flex-1 flex items-center gap-3 px-3 w-full">
                          <Search className="w-5 h-5 text-slate-400" />
                          <input 
                              className="w-full border-none focus:ring-0 text-sm font-bold py-2 bg-transparent placeholder:text-slate-400 outline-none" 
                              placeholder="Type your question about this report..." 
                              type="text"
                              value={question}
                              onChange={(e) => setQuestion(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                              disabled={isAsking}
                          />
                        </div>
                        <button 
                            onClick={handleAskQuestion}
                            disabled={isAsking || !question.trim()}
                            className="w-full md:w-auto bg-blue-600 text-white font-black uppercase text-xs tracking-widest px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-600/10 active:scale-95 transition-all disabled:opacity-50"
                        >
                          {isAsking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                          {isAsking ? "Asking..." : "Ask Seva AI"}
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-8 bg-amber-50 rounded-3xl border border-amber-100 text-amber-900/60 text-xs font-bold leading-relaxed flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 shrink-0 text-amber-500" />
                  <p>
                    DISCLAIMER: This analysis is generated by Artificial Intelligence for informational purposes only. It is NOT a professional medical diagnosis. Always consult with a qualified healthcare provider before making any medical decisions or lifestyle changes based on this report.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
