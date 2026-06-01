import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCheck, Eye, EyeOff, Search, X, MessageSquare, Calendar, User, MailCheck } from 'lucide-react';
import api from '../../utils/api';

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Fetch messages from inbox
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await api.get('/contact');
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.log('Unable to load server messages (offline status)...');
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Mark message as read/unread toggle
  const toggleReadStatus = async (msg) => {
    const nextStatus = msg.status === 'Read' ? 'Unread' : 'Read';
    try {
      const res = await api.put(`/contact/${msg._id}`, { status: nextStatus });
      if (res.data.success) {
        // Optimistically update status in local view state
        setMessages(messages.map(m => m._id === msg._id ? { ...m, status: nextStatus } : m));
        if (selectedMessage && selectedMessage._id === msg._id) {
          setSelectedMessage({ ...selectedMessage, status: nextStatus });
        }
      }
    } catch (err) {
      alert(`Failed to update status: ${err.message}`);
    }
  };

  // Delete message from inbox
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inbox message forever?')) return;

    try {
      const res = await api.delete(`/contact/${id}`);
      if (res.data.success) {
        setMessages(messages.filter(m => m._id !== id));
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (err) {
      alert(`Deletion failure: ${err.message}`);
    }
  };

  // Search filter predicate
  const filteredMessages = messages.filter(m => {
    const query = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(query) ||
      m.email.toLowerCase().includes(query) ||
      m.subject.toLowerCase().includes(query) ||
      m.message.toLowerCase().includes(query)
    );
  });

  // Open full view modal (and auto mark as Read if Unread)
  const handleOpenView = async (msg) => {
    setSelectedMessage(msg);
    if (msg.status === 'Unread') {
      try {
        const res = await api.put(`/contact/${msg._id}`, { status: 'Read' });
        if (res.data.success) {
          setMessages(messages.map(m => m._id === msg._id ? { ...m, status: 'Read' } : m));
        }
      } catch (err) {
        console.error('Failed to mark read on view:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Guest Inbox Messages</h2>
          <p className="text-sm text-slate-500 mt-1">
            Read, analyze, manage, or delete contact inquiries.
          </p>
        </div>

        {/* Search controls */}
        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <Search className="h-4.5 w-4.5" />
          </span>
          <input
            type="text"
            placeholder="Search name, email, subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 text-sm focus:outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="glass-card py-24 text-center rounded-3xl border border-slate-200/40 dark:border-dark-cardBorder/35 flex flex-col items-center justify-center">
          <Mail className="h-12 w-12 text-slate-300 dark:text-slate-700 animate-float" />
          <h3 className="font-bold mt-4 text-slate-600 dark:text-slate-400">Your inbox is clear</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            No contact submissions matched your current search parameter or are available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 text-left">
          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              className={`glass-card p-5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:shadow-md ${
                msg.status === 'Unread'
                  ? 'border-l-4 border-l-primary-500 border-slate-200/80 dark:border-dark-cardBorder bg-primary-500/[0.02]'
                  : 'border-slate-200/40 dark:border-dark-cardBorder/40 opacity-80'
              }`}
              onClick={() => handleOpenView(msg)}
            >
              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-sm text-slate-800 dark:text-white truncate">
                    {msg.name}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                    ({msg.email})
                  </span>
                  
                  {msg.status === 'Unread' && (
                    <span className="px-2 py-0.5 bg-primary-500 text-white rounded text-[8px] font-bold uppercase tracking-wider">
                      New
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 truncate">
                  {msg.subject}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1">
                  {msg.message}
                </p>
              </div>

              {/* Message control buttons */}
              <div className="flex items-center space-x-2 flex-shrink-0 self-end sm:self-center" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => toggleReadStatus(msg)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    msg.status === 'Read'
                      ? 'text-slate-400 border-slate-200 dark:border-dark-cardBorder/40 hover:text-primary-500'
                      : 'text-primary-500 border-primary-500/20 bg-primary-500/5 hover:bg-primary-500/10'
                  }`}
                  title={msg.status === 'Read' ? 'Mark Unread' : 'Mark Read'}
                >
                  {msg.status === 'Read' ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>

                <button
                  onClick={() => handleDelete(msg._id)}
                  className="p-2.5 text-slate-400 border border-slate-200 dark:border-dark-cardBorder/40 hover:text-rose-500 hover:bg-rose-500/5 hover:border-rose-500/20 rounded-xl transition"
                  title="Delete message"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Reader detailed overlay modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs" onClick={() => setSelectedMessage(null)}>
          <div className="glass-card w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-dark-cardBorder/50 flex flex-col text-left" onClick={e => e.stopPropagation()}>
            
            <div className="px-6 py-4 border-b border-slate-100 dark:border-dark-cardBorder/40 flex justify-between items-center bg-slate-50/50 dark:bg-dark-bg/25">
              <h3 className="font-bold text-base flex items-center">
                <MessageSquare className="h-5 w-5 text-primary-500 mr-2" />
                <span>Read Inbox Message</span>
              </h3>
              <button onClick={() => setSelectedMessage(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-200/50">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col space-y-5 overflow-y-auto max-h-[60vh]">
              
              {/* Header profile cards */}
              <div className="p-4 bg-slate-50 dark:bg-dark-bg/40 rounded-2xl border border-slate-200/30 dark:border-dark-cardBorder/30 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <User className="h-4 w-4 text-primary-500" />
                  <span className="font-bold text-slate-600 dark:text-slate-300">From:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedMessage.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <MailCheck className="h-4 w-4 text-primary-500" />
                  <span className="font-bold text-slate-600 dark:text-slate-300">Email:</span>
                  <a href={`mailto:${selectedMessage.email}`} className="font-semibold text-primary-500 hover:underline">{selectedMessage.email}</a>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <Calendar className="h-4 w-4 text-primary-500" />
                  <span className="font-bold text-slate-600 dark:text-slate-300">Received:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject Scope</h4>
                <p className="font-extrabold text-slate-800 dark:text-white text-base">
                  {selectedMessage.subject}
                </p>
              </div>

              {/* Message content */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message Body</h4>
                <div className="p-4 rounded-2xl border border-slate-200/40 dark:border-dark-cardBorder/40 bg-white/50 dark:bg-dark-card/50 text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-full overflow-x-auto whitespace-pre-line">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 dark:border-dark-cardBorder/40 flex justify-end space-x-3 bg-slate-50/50 dark:bg-dark-bg/25">
              <button
                onClick={() => toggleReadStatus(selectedMessage)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-dark-cardBorder/50 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-dark-bg flex items-center space-x-1.5"
              >
                {selectedMessage.status === 'Read' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>Mark as {selectedMessage.status === 'Read' ? 'Unread' : 'Read'}</span>
              </button>
              
              <button
                onClick={() => handleDelete(selectedMessage._id)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Forever</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default MessageManager;
