"use client"
// Github, Linkedin, Twitter 
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Mail, Phone, Send } from 'lucide-react';

import { Toaster, toast } from 'react-hot-toast';

import { io, Socket } from 'socket.io-client'



const ContactSection = () => {

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [subject, setsubject] = useState('');
  const [message, setmessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();

    };
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();





    if (!name || !email || !message) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("جاري إرسال رسالتك...");

    try {
      const res = await axios.post("http://localhost:3001/api/contact", {
        name,
        email,
        subject,
        message
      });

      if (res.data.success) {
        toast.success("تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.", {
          id: loadingToast, // استبدال رسالة التحميل برسالة النجاح
        });

        // تفريغ الحقول
        setname('');
        setemail('');
        setsubject('');
        setmessage('');


        if (socket) {
          socket.emit("new_contact", {
            id: Date.now(),
            title: `رسالة جديدة من ${name}`,
            message: subject || message.substring(0, 50),
            name: name,  // ← أضفنا name هنا
            email: email,
            type: "user"
          });
        }

      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("حدث خطأ أثناء الإرسال، حاول مرة أخرى.", {
        id: loadingToast, // استبدال رسالة التحميل برسالة الخطأ
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20 px-4 min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          },
        }}
      />
      <div className="max-w-6xl w-full">

        {/* العنوان */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4 mt-14">
            لنعمل معاً
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            لديك فكرة مشروع أو ترغب في التعاون؟ سأكون سعيداً بسماع ذلك منك.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* معلومات التواصل */}
          <div className="space-y-8 p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-6">معلومات الاتصال</h3>

            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400">
                {/* <Mail size={24} /> */}
              </div>
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider">البريد الإلكتروني</p>
                <p className="text-lg font-medium">yourname@email.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <div className="p-3 bg-purple-600/20 rounded-xl text-purple-400">
                {/* <Phone size={24} /> */}
              </div>
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider">الهاتف</p>
                <p className="text-lg font-medium">+123 456 789</p>
              </div>
            </div>

            {/* روابط التواصل الاجتماعي */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-4">تابعني على:</p>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <a href="#" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5">
                  {/* <Github size={20} /> */}
                </a>
                <a href="#" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5">
                  {/* <Linkedin size={20} /> */}
                </a>
                <a href="#" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5">
                  {/* <Twitter size={20} /> */}
                </a>
              </div>
            </div>
          </div>

          {/* نموذج التواصل (Form) */}
          <form className="space-y-6 p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 px-1">الاسم بالكامل</label>
                <input
                  type="text"
                  placeholder="أحمد محمد"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 outline-none"
                  value={name}
                  onChange={(e) => setname(e.target.value)}



                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 px-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 outline-none"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 px-1">الموضوع</label>
              <input
                type="text"
                placeholder="كيف يمكنني مساعدتك؟"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 outline-none"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 px-1">الرسالة</label>
              <textarea
                rows={5}
                placeholder="اكتب رسالتك هنا..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 resize-none outline-none"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
              ></textarea>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50"
            >
              <span>{loading ? "جاري الإرسال..." : "إرسال الرسالة"}</span>
              {!loading && <Send size={18} />}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;