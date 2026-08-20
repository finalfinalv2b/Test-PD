"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Folder, 
  MessageSquare, 
  Upload, 
  Download, 
  User, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Cloud, 
  Check, 
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Send,
  Briefcase,
  Paperclip,
  CheckSquare,
  Lock,
  LogOut,
  AlertCircle,
  Mail,
  ShieldCheck,
  MoreVertical,
  Archive,
  RotateCcw,
  Sun,
  Moon,
  Eye,
  Grid,
  ChevronLeft,
  History
} from "lucide-react";

// Pre-populated default user profiles
const DEFAULT_TEAM_MEMBERS = [
  { name: "Ryan Russell", email: "ryan@productdept.com", role: "Product", avatarColor: "bg-blue-500", password: "" },
  { name: "Eddie Ubell", email: "eddie@productdept.com", role: "CEO", avatarColor: "bg-red-500", password: "" },
  { name: "Kitty Liu", email: "kitty@productdept.com", role: "Sourcing", avatarColor: "bg-amber-500", password: "" },
  { name: "Larry Cui", email: "larry@productdept.com", role: "Logistics", avatarColor: "bg-emerald-500", password: "" }
];

const INITIAL_CLIENTS = [
  {
    id: "client-1",
    name: "SpaceX",
    projects: [
      {
        id: "proj-1-1",
        name: "Starshield Structural Enclosure",
        status: "Design",
        deadline: "2026-08-15",
        files: [
          { name: "Starshield_Specs_v2.pdf", size: "2.4 MB", url: "", uploadedBy: "Eddie Ubell", date: "2026-06-20", isMock: true, versions: [] }
        ],
        comments: [
          { id: "c-1", sender: "Eddie Ubell", role: "CEO", text: "Freedom-to-operate analysis completed. We are clear to begin CAD drafting.", date: "2026-06-20 14:32" },
          { id: "c-2", sender: "Ryan Russell", role: "Product", text: "CAD model is 75% complete. Reviewing wall thickness flow marks now.", date: "2026-06-22 10:15" }
        ]
      },
      {
        id: "proj-1-2",
        name: "IP-Rating Gasket Fasteners",
        status: "Tooling",
        deadline: "2026-09-01",
        files: [
          { name: "gasket_tooling_mesh.step", size: "18.1 MB", url: "", uploadedBy: "Kitty Liu", date: "2026-06-25", isMock: true, versions: [] }
        ],
        comments: [
          { id: "c-3", sender: "Kitty Liu", role: "Sourcing", text: "Tooling supplier selected. Mold trials start next week.", date: "2026-06-25 16:45" }
        ]
      }
    ]
  },
  {
    id: "client-2",
    name: "Humane",
    projects: [
      {
        id: "proj-2-1",
        name: "AI Badge CMF Formulation",
        status: "Mass Production",
        deadline: "2026-07-20",
        files: [
          { name: "Anodizing_Beige_Specs.cmf", size: "450 KB", url: "", uploadedBy: "Ryan Russell", date: "2026-06-18", isMock: true, versions: [] }
        ],
        comments: [
          { id: "c-4", sender: "Larry Cui", role: "Logistics", text: "Initial batch cleared customs. On-track for warehouse delivery on the 20th.", date: "2026-06-28 09:12" }
        ]
      }
    ]
  }
];

const INITIAL_MESSAGES = {
  "#general": [
    { id: "m-1", sender: "Eddie Ubell", role: "CEO", text: "Welcome to the secure Product Dept. operations board! Let's track our client milestones and communicate securely.", timestamp: "2026-06-20 10:00", deleted: false },
    { id: "m-2", sender: "Kitty Liu", role: "Sourcing", text: "Awesome dashboard. Makes keeping track of suppliers and sharing secure documents much easier.", timestamp: "2026-06-20 10:30", deleted: false }
  ],
  "#engineering-sync": [
    { id: "m-3", sender: "Ryan Russell", role: "Product", text: "SpaceX Starshield team requested a progress update on the enclosure tolerances. Larry, how are the test coupons looking?", timestamp: "2026-06-24 11:20", deleted: false },
    { id: "m-4", sender: "Larry Cui", role: "Logistics", text: "Coupons are on the way. Courier expected tomorrow morning.", timestamp: "2026-06-24 11:45", deleted: false }
  ],
  "dm__Eddie Ubell__Ryan Russell": [
    { id: "m-5", sender: "Eddie Ubell", role: "CEO", text: "Hey Ryan, can you make sure to link your Google Drive? We need the shared specs folder sync'd up.", timestamp: "2026-06-21 15:00", deleted: false }
  ]
};

interface ArchivedItem {
  id: string;
  type: "client" | "project";
  name: string;
  archivedDate: string;
  originalClientId?: string;
  originalClientName?: string;
  itemData: any;
}

// SSR-safe IndexedDB helper utility for large file and message payloads
const idbHelper = {
  dbName: "sec_pm_db",
  storeName: "keyval",

  getDb(): Promise<IDBDatabase | null> {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined" || !window.indexedDB) {
        return resolve(null);
      }
      const request = indexedDB.open(this.dbName, 1);
      request.onupgradeneeded = () => {
        request.result.createObjectStore(this.storeName);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async get(key: string): Promise<any> {
    try {
      const db = await this.getDb();
      if (!db) return null;
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readonly");
        const store = tx.objectStore(this.storeName);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.error("IndexedDB get error:", err);
      return null;
    }
  },

  async set(key: string, val: any): Promise<void> {
    try {
      const db = await this.getDb();
      if (!db) return;
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        const req = store.put(val, key);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.error("IndexedDB set error:", err);
    }
  },

  async remove(key: string): Promise<void> {
    try {
      const db = await this.getDb();
      if (!db) return;
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        const req = store.delete(key);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.error("IndexedDB remove error:", err);
    }
  }
};

export default function ProductMgmt() {
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<typeof DEFAULT_TEAM_MEMBERS[0] | null>(null);
  const [userDb, setUserDb] = useState<typeof DEFAULT_TEAM_MEMBERS>([]);
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Set / Reset password flow states
  const [authView, setAuthView] = useState<"login" | "forgot" | "set-password">("login");
  const [forgotEmail, setForgotEmail] = useState("");
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [simulatedEmailSentTo, setSimulatedEmailSentTo] = useState<string | null>(null);
  const [setPasswordEmail, setSetPasswordEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [setPasswordError, setSetPasswordError] = useState("");

  // Dashboard theme and views
  const [activeTab, setActiveTab] = useState("projects");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [messages, setMessages] = useState<Record<string, any[]>>(INITIAL_MESSAGES);
  const [archivedItems, setArchivedItems] = useState<ArchivedItem[]>([]);
  const [activeChat, setActiveChat] = useState("#general");
  const [chatSearchQuery, setChatSearchQuery] = useState("");
  const [isDriveLinked, setIsDriveLinked] = useState(false);
  const [isLinkingDrive, setIsLinkingDrive] = useState(false);
  
  // CRUD states
  const [newClientName, setNewClientName] = useState("");
  const [newProjectName, setNewProjectName] = useState<Record<string, string>>({});
  const [openCommentsProjectId, setOpenCommentsProjectId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [chatInputText, setChatInputText] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingMessageText, setEditingMessageText] = useState("");
  const [collapsedClients, setCollapsedClients] = useState<Record<string, boolean>>({});

  // Dropdown states
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Inline edits
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [editingClientText, setEditingClientText] = useState("");
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingProjectText, setEditingProjectText] = useState("");

  // Drag & Drop States
  const [draggingClientId, setDraggingClientId] = useState<string | null>(null);

  // Batch Select Checkboxes
  const [selectedFiles, setSelectedFiles] = useState<Record<string, boolean>>({});

  // Single File Preview Modal State
  const [previewFile, setPreviewFile] = useState<any | null>(null);
  const [selectedVersionId, setSelectedVersionId] = useState<string>("active");

  // Expanded Versions in File Table (Key: `${clientId}__${projectId}__${fileName}`)
  const [expandedVersions, setExpandedVersions] = useState<Record<string, boolean>>({});

  // Mosaic Bento Box View State
  const [mosaicClientId, setMosaicClientId] = useState<string | null>(null);

  // Chat message container scroll ref
  const chatEndRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load state, session, and database from IndexedDB & localStorage, then sync with cloud storage
  useEffect(() => {
    const initializeData = async () => {
      // 1. Initial Local load (so UI displays instantly)
      const dbClients = await idbHelper.get("sec_pm_clients");
      if (dbClients && Array.isArray(dbClients)) {
        setClients(dbClients);
      } else {
        const savedClients = localStorage.getItem("sec_pm_clients");
        if (savedClients) {
          try {
            const parsed = JSON.parse(savedClients);
            if (Array.isArray(parsed)) setClients(parsed);
          } catch (e) {
            console.warn("Failed to parse local storage clients:", e);
          }
        }
      }

      const dbMessages = await idbHelper.get("sec_pm_messages");
      if (dbMessages && Array.isArray(dbMessages)) {
        setMessages(dbMessages);
      } else {
        const savedMessages = localStorage.getItem("sec_pm_messages");
        if (savedMessages) {
          try {
            const parsed = JSON.parse(savedMessages);
            if (Array.isArray(parsed)) setMessages(parsed);
          } catch (e) {
            console.warn("Failed to parse local storage messages:", e);
          }
        }
      }

      const dbArchived = await idbHelper.get("sec_pm_archived_items");
      if (dbArchived && Array.isArray(dbArchived)) {
        setArchivedItems(dbArchived);
      } else {
        const savedArchived = localStorage.getItem("sec_pm_archived_items");
        if (savedArchived) {
          try {
            const parsed = JSON.parse(savedArchived);
            if (Array.isArray(parsed)) setArchivedItems(parsed);
          } catch (e) {
            console.warn("Failed to parse local storage archived items:", e);
          }
        }
      }

      const savedDrive = localStorage.getItem("sec_pm_drive_linked");
      const savedSession = localStorage.getItem("sec_pm_session_email");
      const savedUserDb = localStorage.getItem("sec_pm_user_db");
      const savedDarkMode = localStorage.getItem("sec_pm_dark_mode");

      if (savedDrive) setIsDriveLinked(savedDrive === "true");
      if (savedDarkMode) setIsDarkMode(savedDarkMode === "true");

      let resolvedDb = DEFAULT_TEAM_MEMBERS;
      if (savedUserDb) {
        try {
          const parsed = JSON.parse(savedUserDb);
          if (parsed && typeof parsed === "object") {
            resolvedDb = parsed;
            setUserDb(resolvedDb);
          }
        } catch (e) {
          console.warn("Failed to parse local storage user db:", e);
          setUserDb(DEFAULT_TEAM_MEMBERS);
        }
      } else {
        setUserDb(DEFAULT_TEAM_MEMBERS);
        try {
          localStorage.setItem("sec_pm_user_db", JSON.stringify(DEFAULT_TEAM_MEMBERS));
        } catch (e) {
          console.warn("localStorage quota exceeded for user db:", e);
        }
      }

      if (savedSession && Array.isArray(resolvedDb)) {
        const user = resolvedDb.find(m => m.email === savedSession);
        if (user) {
          setCurrentUser(user);
          setIsLoggedIn(true);
        }
      }

      // Parse URL verification queries
      const params = new URLSearchParams(window.location.search);
      const action = params.get("action");
      const email = params.get("email");
      if (action === "set-password" && email) {
        setSetPasswordEmail(email);
        setAuthView("set-password");
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      // 2. Cloud Hydration (pull fresh database changes from Vercel Blob sync route)
      try {
        const timestamp = Date.now();
        const clientsRes = await fetch(`/api/sync?key=clients&t=${timestamp}`, { cache: "no-store" });
        if (clientsRes.ok) {
          const cloudClients = await clientsRes.json();
          if (cloudClients && Array.isArray(cloudClients)) {
            setClients(cloudClients);
            idbHelper.set("sec_pm_clients", cloudClients);
            try {
              localStorage.setItem("sec_pm_clients", JSON.stringify(cloudClients));
            } catch (e) {}

            // Auto-sync all connected Google Drive folders in the background on load
            cloudClients.forEach((c: any) => {
              if (c.gdriveFolderId) {
                syncGoogleDriveFolder(c.id, c.gdriveFolderId, cloudClients);
              }
            });
          }
        }

        const messagesRes = await fetch(`/api/sync?key=messages&t=${timestamp}`, { cache: "no-store" });
        if (messagesRes.ok) {
          const cloudMessages = await messagesRes.json();
          if (cloudMessages && Array.isArray(cloudMessages)) {
            setMessages(cloudMessages);
            idbHelper.set("sec_pm_messages", cloudMessages);
            try {
              localStorage.setItem("sec_pm_messages", JSON.stringify(cloudMessages));
            } catch (e) {}
          }
        }

        const archivedRes = await fetch(`/api/sync?key=archived_items&t=${timestamp}`, { cache: "no-store" });
        if (archivedRes.ok) {
          const cloudArchived = await archivedRes.json();
          if (cloudArchived && Array.isArray(cloudArchived)) {
            setArchivedItems(cloudArchived);
            idbHelper.set("sec_pm_archived_items", cloudArchived);
            try {
              localStorage.setItem("sec_pm_archived_items", JSON.stringify(cloudArchived));
            } catch (e) {}
          }
        }

        const userDbRes = await fetch(`/api/sync?key=user_db&t=${timestamp}`, { cache: "no-store" });
        if (userDbRes.ok) {
          const cloudUserDb = await userDbRes.json();
          if (cloudUserDb && typeof cloudUserDb === "object") {
            setUserDb(cloudUserDb);
            try {
              localStorage.setItem("sec_pm_user_db", JSON.stringify(cloudUserDb));
            } catch (e) {}
          }
        }
      } catch (err) {
        console.warn("Cloud storage background hydration offline or failed:", err);
      }
    };

    initializeData();
  }, []);

  // Reset selected version when previewFile changes
  useEffect(() => {
    if (previewFile) {
      setSelectedVersionId(previewFile.initialSelectedVersionId || "active");
    } else {
      setSelectedVersionId("active");
    }
  }, [previewFile]);

  const saveClients = (newClients: typeof INITIAL_CLIENTS) => {
    setClients(newClients);
    try {
      localStorage.setItem("sec_pm_clients", JSON.stringify(newClients));
    } catch (e) {
      console.warn("localStorage quota exceeded, relying on IndexedDB for files:", e);
    }
    idbHelper.set("sec_pm_clients", newClients);
    // Sync to cloud database
    fetch("/api/sync?key=clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newClients)
    }).catch(err => console.warn("Failed to broadcast clients sync update:", err));
  };

  const saveMessages = (newMessages: any) => {
    setMessages(newMessages);
    try {
      localStorage.setItem("sec_pm_messages", JSON.stringify(newMessages));
    } catch (e) {
      console.warn("localStorage quota exceeded for messages, relying on IndexedDB:", e);
    }
    idbHelper.set("sec_pm_messages", newMessages);
    // Sync to cloud database
    fetch("/api/sync?key=messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessages)
    }).catch(err => console.warn("Failed to broadcast messages sync update:", err));
  };

  const saveUserDb = (newDb: typeof DEFAULT_TEAM_MEMBERS) => {
    setUserDb(newDb);
    try {
      localStorage.setItem("sec_pm_user_db", JSON.stringify(newDb));
    } catch (e) {
      console.warn("localStorage quota exceeded for user db:", e);
    }
    // Sync credentials list so logins work on all devices
    fetch("/api/sync?key=user_db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDb)
    }).catch(err => console.warn("Failed to broadcast user db sync update:", err));
  };

  const saveArchivedItems = (newArchived: ArchivedItem[]) => {
    setArchivedItems(newArchived);
    try {
      localStorage.setItem("sec_pm_archived_items", JSON.stringify(newArchived));
    } catch (e) {
      console.warn("localStorage quota exceeded for archived items, relying on IndexedDB:", e);
    }
    idbHelper.set("sec_pm_archived_items", newArchived);
    // Sync to cloud database
    fetch("/api/sync?key=archived_items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArchived)
    }).catch(err => console.warn("Failed to broadcast archive sync update:", err));
  };

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    localStorage.setItem("sec_pm_dark_mode", String(nextMode));
  };

  // Scroll to bottom of chat when activeChat or messages changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat, messages, isLoggedIn]);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const user = userDb.find(
      m => m.email.toLowerCase() === loginEmail.toLowerCase().trim()
    );

    if (!user) {
      setLoginError("Account not found. Access restricted to corporate users.");
      return;
    }

    if (!user.password) {
      setLoginError("No access key set for this user yet. Click 'Set or reset access key' below to verify email and create password.");
      return;
    }

    if (user.password === loginPassword) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem("sec_pm_session_email", user.email);
      setLoginEmail("");
      setLoginPassword("");
    } else {
      setLoginError("Invalid password access key.");
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("sec_pm_session_email");
    setActiveChat("#general");
  };

  // Request Access Key (Triggers Email Verification Link via API, falls back to mock overlay)
  const handleRequestVerificationLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const targetEmail = forgotEmail.toLowerCase().trim();
    const userExists = userDb.some(m => m.email === targetEmail);

    if (!userExists) {
      setLoginError("Email address not recognized in corporate directory.");
      return;
    }

    setIsSendingLink(true);

    const verificationLink = `${window.location.origin}/product-mgmt?action=set-password&email=${encodeURIComponent(targetEmail)}`;

    try {
      const response = await fetch("/api/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail, verificationLink })
      });

      setIsSendingLink(false);

      if (response.ok) {
        alert(`Real verification link sent to ${targetEmail}! Please check your email inbox (and spam/junk folders).`);
      } else {
        const errorData = await response.json();
        console.warn("Real email failed (Resend API key may not be configured):", errorData.error);
        setSimulatedEmailSentTo(targetEmail);
      }
    } catch (err) {
      setIsSendingLink(false);
      console.error("Real email dispatch failed, falling back to local simulation:", err);
      setSimulatedEmailSentTo(targetEmail);
    }
  };

  // Set / Save Password Handler
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSetPasswordError("");

    if (newPassword.length < 6) {
      setSetPasswordError("Access Key must be at least 6 characters long.");
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setSetPasswordError("Password confirmation does not match.");
      return;
    }

    const updatedDb = userDb.map(u => {
      if (u.email === setPasswordEmail) {
        return { ...u, password: newPassword };
      }
      return u;
    });

    saveUserDb(updatedDb);

    const loggedInUser = updatedDb.find(u => u.email === setPasswordEmail);
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
      setIsLoggedIn(true);
      localStorage.setItem("sec_pm_session_email", loggedInUser.email);
    }

    setAuthView("login");
    setSetPasswordEmail("");
    setNewPassword("");
    setNewPasswordConfirm("");
  };

  // Helper to generate DM keys (always sorted so it's private and isolated between two members)
  const getDMKey = (userA: string, userB: string) => {
    return ["dm", userA, userB].sort().join("__");
  };

  // Extract other participant's name from a DM key
  const getDMPartnerName = (key: string, currentUserName: string) => {
    if (!key.startsWith("dm__")) return key;
    const parts = key.replace("dm__", "").split("__");
    return parts.find(p => p !== currentUserName) || "Team Member";
  };

  // Handle Client Add
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;
    const newClient = {
      id: `client-${Date.now()}`,
      name: newClientName.trim(),
      projects: []
    };
    saveClients([...clients, newClient]);
    setNewClientName("");
  };

  // Edit Client Name
  const handleUpdateClientName = (clientId: string) => {
    if (!editingClientText.trim()) return;
    const updated = clients.map(c => {
      if (c.id === clientId) {
        return { ...c, name: editingClientText.trim() };
      }
      return c;
    });
    saveClients(updated);
    setEditingClientId(null);
    setActiveMenuId(null);
  };

  // Delete Client Group
  const handleDeleteClient = (clientId: string) => {
    if (confirm("Are you sure you want to delete this client? All client projects will be permanently deleted.")) {
      const updated = clients.filter(c => c.id !== clientId);
      saveClients(updated);
      setActiveMenuId(null);
    }
  };

  // Archive Client Group
  const handleArchiveClient = (clientId: string) => {
    const clientToArchive = clients.find(c => c.id === clientId);
    if (!clientToArchive) return;

    if (confirm(`Are you sure you want to archive ${clientToArchive.name}? All associated projects will be archived.`)) {
      const newArchivedItem: ArchivedItem = {
        id: `archive-${Date.now()}`,
        type: "client",
        name: clientToArchive.name,
        archivedDate: new Date().toISOString(),
        itemData: clientToArchive
      };

      saveArchivedItems([...archivedItems, newArchivedItem]);
      saveClients(clients.filter(c => c.id !== clientId));
      setActiveMenuId(null);
    }
  };

  // Handle Project Add
  const handleAddProject = (clientId: string) => {
    const name = newProjectName[clientId];
    if (!name || !name.trim()) return;

    const updatedClients = clients.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          projects: [
            ...client.projects,
            {
              id: `proj-${Date.now()}`,
              name: name.trim(),
              status: "Discovery",
              deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              files: [],
              comments: []
            }
          ]
        };
      }
      return client;
    });

    saveClients(updatedClients);
    setNewProjectName({
      ...newProjectName,
      [clientId]: ""
    });
  };

  // Update Project Name
  const handleUpdateProjectName = (projectId: string) => {
    if (!editingProjectText.trim()) return;
    const updated = clients.map(c => {
      return {
        ...c,
        projects: c.projects.map(p => {
          if (p.id === projectId) {
            return { ...p, name: editingProjectText.trim() };
          }
          return p;
        })
      };
    });
    saveClients(updated);
    setEditingProjectId(null);
    setActiveMenuId(null);
  };

  // Delete Project
  const handleDeleteProject = (projectId: string) => {
    if (confirm("Are you sure you want to delete this project? All project files and logs will be permanently deleted.")) {
      const updated = clients.map(c => {
        return {
          ...c,
          projects: c.projects.filter(p => p.id !== projectId)
        };
      });
      saveClients(updated);
      setActiveMenuId(null);
    }
  };

  // Archive Project
  const handleArchiveProject = (projectId: string) => {
    let projectToArchive: any = null;
    let parentClient: any = null;

    clients.forEach(c => {
      const found = c.projects.find(p => p.id === projectId);
      if (found) {
        projectToArchive = found;
        parentClient = c;
      }
    });

    if (!projectToArchive || !parentClient) return;

    if (confirm(`Are you sure you want to archive the project "${projectToArchive.name}"?`)) {
      const newArchivedItem: ArchivedItem = {
        id: `archive-${Date.now()}`,
        type: "project",
        name: projectToArchive.name,
        archivedDate: new Date().toISOString(),
        originalClientId: parentClient.id,
        originalClientName: parentClient.name,
        itemData: projectToArchive
      };

      const updatedClients = clients.map(c => {
        if (c.id === parentClient.id) {
          return {
            ...c,
            projects: c.projects.filter(p => p.id !== projectId)
          };
        }
        return c;
      });

      saveClients(updatedClients);
      saveArchivedItems([...archivedItems, newArchivedItem]);
      setActiveMenuId(null);
    }
  };

  // Restore Archived Item
  const handleRestoreItem = (item: ArchivedItem) => {
    if (item.type === "client") {
      saveClients([...clients, item.itemData]);
    } else {
      const clientExists = clients.some(c => c.id === item.originalClientId);

      if (clientExists) {
        const updated = clients.map(c => {
          if (c.id === item.originalClientId) {
            return {
              ...c,
              projects: [...c.projects, item.itemData]
            };
          }
          return c;
        });
        saveClients(updated);
      } else {
        const newClient = {
          id: item.originalClientId || `client-${Date.now()}`,
          name: item.originalClientName || "Restored client",
          projects: [item.itemData]
        };
        saveClients([...clients, newClient]);
      }
    }

    saveArchivedItems(archivedItems.filter(i => i.id !== item.id));
  };

  // Delete Archived Item Permanently
  const handleDeleteArchivedItem = (itemId: string) => {
    if (confirm("Are you sure you want to delete this item permanently? This action cannot be undone.")) {
      saveArchivedItems(archivedItems.filter(i => i.id !== itemId));
    }
  };

  // Handle Status Change
  const handleStatusChange = (projectId: string, newStatus: string) => {
    const updatedClients = clients.map(client => {
      return {
        ...client,
        projects: client.projects.map(proj => {
          if (proj.id === projectId) {
            return { ...proj, status: newStatus };
          }
          return proj;
        })
      };
    });
    saveClients(updatedClients);
  };

  // Handle Deadline Change
  const handleDeadlineChange = (projectId: string, newDeadline: string) => {
    const updatedClients = clients.map(client => {
      return {
        ...client,
        projects: client.projects.map(proj => {
          if (proj.id === projectId) {
            return { ...proj, deadline: newDeadline };
          }
          return proj;
        })
      };
    });
    saveClients(updatedClients);
  };

  // Format Dragged Filename to Project Name
  const formatFileNameToProjectName = (fileName: string) => {
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
    const spacedName = nameWithoutExt.replace(/[_-]/g, ' ');
    return spacedName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Drag and Drop drop zone handlers
  const handleDragOver = (e: React.DragEvent, clientId: string) => {
    e.preventDefault();
    setDraggingClientId(clientId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingClientId(null);
  };

  // Process file upload by sending it to Google Drive if connected, otherwise Vercel Blob cloud storage with a local Object URL fallback
  const processUploadedFile = async (
    fileObj: File, 
    projectId: string | null, 
    clientId: string | null, 
    callback: (newFileEntry: any) => void
  ) => {
    const extension = fileObj.name.substring(fileObj.name.lastIndexOf('.')).toLowerCase();
    const isText = fileObj.type.startsWith("text/") || 
                   [".txt", ".md", ".json", ".csv", ".cmf", ".step", ".stp"].includes(extension);

    // Find if the target client has a connected Google Drive folder
    let targetClient: any = null;
    if (clientId) {
      targetClient = clients.find(c => c.id === clientId);
    } else if (projectId) {
      clients.forEach(c => {
        if (c.projects.some(p => p.id === projectId)) {
          targetClient = c;
        }
      });
    }

    const folderId = targetClient?.gdriveFolderId;

    const entry: any = {
      name: fileObj.name,
      size: `${(fileObj.size / (1024 * 1024)).toFixed(2)} MB`,
      uploadedBy: currentUser?.name || "Ryan Russell",
      date: new Date().toISOString().split('T')[0],
      fileType: fileObj.type,
      isRealUpload: true,
      url: "",
      versions: []
    };

    if (folderId) {
      // Direct upload to Google Drive via Apps Script route!
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const base64Content = (e.target?.result as string).split(",")[1];
            const response = await fetch("/api/sync/gdrive/upload", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                folderId,
                fileName: fileObj.name,
                fileContent: base64Content,
                contentType: fileObj.type || "application/octet-stream"
              })
            });

            if (response.ok) {
              const data = await response.json();
              if (data.status === "success") {
                entry.url = `https://drive.google.com/uc?export=download&id=${data.id}`;
                entry.previewUrl = `https://drive.google.com/file/d/${data.id}/preview`;
                entry.isGoogleDrive = true;
                entry.size = data.size ? `${(parseInt(data.size) / (1024 * 1024)).toFixed(2)} MB` : entry.size;
              } else {
                throw new Error(data.message || "Apps Script failed to write file.");
              }
            } else {
              throw new Error("Proxy upload endpoint failed.");
            }
          } catch (uploadErr) {
            console.warn("Direct Google Drive upload failed. Falling back to Vercel/tmpfiles.org uploader:", uploadErr);
            await uploadToVercelBlobOrTmpfiles(fileObj, entry);
          }
          
          // Complete file process
          if (isText && fileObj.size < 5 * 1024 * 1024) {
            const txtReader = new FileReader();
            txtReader.onload = (txtEvent) => {
              entry.content = txtEvent.target?.result as string;
              callback(entry);
            };
            txtReader.readAsText(fileObj);
          } else {
            callback(entry);
          }
        };
        reader.readAsDataURL(fileObj);
        return;
      } catch (err) {
        console.warn("Reader failed. Falling back to standard uploader:", err);
      }
    }

    // Default fallback uploader (Vercel Blob / tmpfiles.org)
    await uploadToVercelBlobOrTmpfiles(fileObj, entry);

    if (isText && fileObj.size < 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => {
        entry.content = e.target?.result as string;
        callback(entry);
      };
      reader.readAsText(fileObj);
    } else {
      callback(entry);
    }
  };

  const uploadToVercelBlobOrTmpfiles = async (fileObj: File, entry: any) => {
    const formData = new FormData();
    formData.append("file", fileObj);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        entry.url = data.url;
        entry.size = data.size;
      } else {
        throw new Error("Uploader returned error status.");
      }
    } catch (err) {
      console.warn("Upload failed. Using local Object URL fallback:", err);
      entry.url = URL.createObjectURL(fileObj);
    }
  };

  // Drag-and-Drop files onto Client board
  const handleDropFiles = (e: React.DragEvent, clientId: string) => {
    e.preventDefault();
    setDraggingClientId(null);
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    let processedCount = 0;
    const projectMutations: Record<string, any> = {}; // projectId to new file list

    files.forEach((file, idx) => {
      processUploadedFile(file, null, clientId, (fileEntry) => {
        const cleanedProjName = formatFileNameToProjectName(file.name);
        
        // Check if project with this cleaned name already exists under the client
        const targetClient = clients.find(c => c.id === clientId);
        const existingProj = targetClient?.projects.find(
          p => p.name.toLowerCase() === cleanedProjName.toLowerCase()
        );

        if (existingProj) {
          // Check if file with same name already exists in this project
          const existingFile = existingProj.files.find(f => f.name === fileEntry.name);

          let updatedFiles = [...existingProj.files];
          if (existingFile) {
            // Version Collision! Archive current primary file
            const newVersion = {
              versionId: (existingFile.versions?.length || 0) + 1,
              name: existingFile.name,
              size: existingFile.size,
              url: existingFile.url,
              uploadedBy: existingFile.uploadedBy,
              date: existingFile.date,
              content: existingFile.content,
              fileType: existingFile.fileType,
              isRealUpload: existingFile.isRealUpload,
              isMock: existingFile.isMock
            };

            const updatedFile = {
              ...fileEntry,
              versions: [newVersion, ...(existingFile.versions || [])]
            };

            updatedFiles = existingProj.files.map(f => f.name === fileEntry.name ? updatedFile : f);
          } else {
            // Append file to existing project
            updatedFiles.push(fileEntry);
          }

          projectMutations[existingProj.id] = updatedFiles;
        } else {
          // Create new project with new file
          const newProjId = `proj-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 9)}`;
          projectMutations[newProjId] = {
            id: newProjId,
            name: cleanedProjName,
            status: "Discovery",
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            files: [fileEntry],
            comments: []
          };
        }

        processedCount++;
        if (processedCount === files.length) {
          // Merge mutations
          const updatedClients = clients.map(client => {
            if (client.id === clientId) {
              const currentProjects = [...client.projects];
              const resolvedProjects = currentProjects.map(proj => {
                if (projectMutations[proj.id]) {
                  return { ...proj, files: projectMutations[proj.id] };
                }
                return proj;
              });

              // Add newly generated projects
              Object.keys(projectMutations).forEach(key => {
                if (key.startsWith("proj-") && !currentProjects.some(p => p.id === key)) {
                  resolvedProjects.push(projectMutations[key]);
                }
              });

              return {
                ...client,
                projects: resolvedProjects
              };
            }
            return client;
          });

          saveClients(updatedClients);
        }
      });
    });
  };

  // Toggle selection checkbox for batch files
  const toggleFileSelection = (fileKey: string) => {
    setSelectedFiles(prev => ({
      ...prev,
      [fileKey]: !prev[fileKey]
    }));
  };

  // Batch Download Trigger
  const handleBatchDownload = (clientId: string) => {
    const keys = Object.keys(selectedFiles).filter(
      key => key.startsWith(`${clientId}__`) && selectedFiles[key]
    );

    if (keys.length === 0) return;

    keys.forEach(key => {
      const parts = key.split("__");
      const fileName = parts[2];
      
      let targetFileObj: any = null;
      clients.forEach(c => {
        c.projects.forEach(p => {
          const found = p.files.find(f => f.name === fileName);
          if (found) targetFileObj = found;
        });
      });

      if (targetFileObj && targetFileObj.isRealUpload && targetFileObj.url) {
        const link = document.createElement("a");
        link.href = targetFileObj.url;
        link.download = targetFileObj.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        triggerDownload(fileName);
      }
    });

    const updatedSelections = { ...selectedFiles };
    keys.forEach(key => {
      updatedSelections[key] = false;
    });
    setSelectedFiles(updatedSelections);
  };

  // Handle File Upload Input under a specific project
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, projectId: string) => {
    if (!currentUser) return;
    const file = e.target.files?.[0];
    if (!file) return;

    processUploadedFile(file, projectId, null, (fileEntry) => {
      const updatedClients = clients.map(client => {
        return {
          ...client,
          projects: client.projects.map(proj => {
            if (proj.id === projectId) {
              const existingFile = proj.files.find(f => f.name === fileEntry.name);

              if (existingFile) {
                // Version Collision! Archive current primary file in versions array
                const newVersion = {
                  versionId: (existingFile.versions?.length || 0) + 1,
                  name: existingFile.name,
                  size: existingFile.size,
                  url: existingFile.url,
                  uploadedBy: existingFile.uploadedBy,
                  date: existingFile.date,
                  content: existingFile.content,
                  fileType: existingFile.fileType,
                  isRealUpload: existingFile.isRealUpload,
                  isMock: existingFile.isMock
                };

                const updatedFile = {
                  ...fileEntry,
                  versions: [newVersion, ...(existingFile.versions || [])]
                };

                return {
                  ...proj,
                  files: proj.files.map(f => f.name === fileEntry.name ? updatedFile : f)
                };
              } else {
                // No overlap, just append file
                return {
                  ...proj,
                  files: [...proj.files, fileEntry]
                };
              }
            }
            return proj;
          })
        };
      });
      saveClients(updatedClients);
    });
  };

  // Add Google Drive File Link to Project
  const handleAddGoogleDriveLink = (urlInput: string, projectId: string) => {
    if (!currentUser) return;
    
    // Parse Google Drive file ID from shared link
    let fileId = "";
    const fileIdMatch = urlInput.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || urlInput.match(/id=([a-zA-Z0-9_-]+)/);
    
    if (fileIdMatch && fileIdMatch[1]) {
      fileId = fileIdMatch[1];
    } else {
      if (urlInput.length > 15 && !urlInput.includes("/")) {
        fileId = urlInput;
      } else {
        alert("Invalid Google Drive shared link format. Please make sure the link contains the File ID.");
        return;
      }
    }

    const rawFileName = prompt("Enter a display name for this Google Drive file:", "Starshield_Enclosure_Tolerances.pdf");
    if (!rawFileName) return;
    const fileName = rawFileName.trim();

    const driveFileEntry = {
      name: fileName,
      size: "GDrive Cloud File",
      url: `https://drive.google.com/uc?export=download&id=${fileId}`,
      previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      uploadedBy: currentUser.name,
      date: new Date().toISOString().split('T')[0],
      fileType: "application/google-drive",
      isGoogleDrive: true,
      isRealUpload: true,
      versions: []
    };

    const updatedClients = clients.map(client => {
      return {
        ...client,
        projects: client.projects.map(proj => {
          if (proj.id === projectId) {
            const existingFile = proj.files.find(f => f.name === fileName);

            if (existingFile) {
              const newVersion = {
                versionId: (existingFile.versions?.length || 0) + 1,
                name: existingFile.name,
                size: existingFile.size,
                url: existingFile.url,
                previewUrl: (existingFile as any).previewUrl || "",
                uploadedBy: existingFile.uploadedBy,
                date: existingFile.date,
                isGoogleDrive: (existingFile as any).isGoogleDrive || false,
                isRealUpload: existingFile.isRealUpload,
                isMock: existingFile.isMock
              };

              const updatedFile = {
                ...driveFileEntry,
                versions: [newVersion, ...(existingFile.versions || [])]
              };

              return {
                ...proj,
                files: proj.files.map(f => f.name === fileName ? updatedFile : f)
              };
            } else {
              return {
                ...proj,
                files: [...proj.files, driveFileEntry]
              };
            }
          }
          return proj;
        })
      };
    });

    saveClients(updatedClients);
  };

  // Connect Google Drive Folder to Client
  const handleConnectGoogleDriveFolder = (clientId: string) => {
    const urlInput = prompt("Paste public Google Drive Folder Link (anyone with link can view):");
    if (!urlInput) return;

    let folderId = "";
    const folderIdMatch = urlInput.match(/\/folders\/([a-zA-Z0-9_-]+)/);
    if (folderIdMatch && folderIdMatch[1]) {
      folderId = folderIdMatch[1];
    } else {
      if (urlInput.length > 15 && !urlInput.includes("/")) {
        folderId = urlInput;
      } else {
        alert("Invalid Google Drive Folder Link format. Please copy it directly from Google Drive.");
        return;
      }
    }

    const updated = clients.map(c => {
      if (c.id === clientId) {
        return {
          ...c,
          gdriveFolderUrl: urlInput,
          gdriveFolderId: folderId
        };
      }
      return c;
    });

    saveClients(updated);
    
    // Trigger immediate sync
    syncGoogleDriveFolder(clientId, folderId, updated);
  };

  // Sync Google Drive Folder contents and auto-map to projects
  const syncGoogleDriveFolder = async (clientId: string, folderId: string, currentClients = clients) => {
    try {
      const response = await fetch(`/api/sync/gdrive?folderId=${folderId}&t=${Date.now()}`);
      if (!response.ok) throw new Error("GDrive sync fetch failed.");

      const data = await response.json();
      if (!data.files) return;

      const driveFiles = data.files;

      // Group files by cleaned project name
      const filesByProject: Record<string, any[]> = {};
      driveFiles.forEach((file: any) => {
        const cleanedProjName = formatFileNameToProjectName(file.name);
        if (!filesByProject[cleanedProjName]) {
          filesByProject[cleanedProjName] = [];
        }

        const fileEntry = {
          name: file.name,
          size: file.size,
          url: `https://drive.google.com/uc?export=download&id=${file.id}`,
          previewUrl: `https://drive.google.com/file/d/${file.id}/preview`,
          uploadedBy: "Google Drive Sync",
          date: new Date(file.modifiedTime || Date.now()).toISOString().split('T')[0],
          fileType: file.mimeType,
          isGoogleDrive: true,
          isRealUpload: true,
          versions: []
        };

        filesByProject[cleanedProjName].push(fileEntry);
      });

      // Update client projects with files
      const updated = currentClients.map(c => {
        if (c.id === clientId) {
          const updatedProjects = [...c.projects];

          // Map files to projects
          Object.keys(filesByProject).forEach(projName => {
            const existingProj = updatedProjects.find(
              p => p.name.toLowerCase() === projName.toLowerCase()
            );

            if (existingProj) {
              // Merge files into existing project
              const mergedFiles = [...existingProj.files];

              filesByProject[projName].forEach((newFile: any) => {
                const existingFileIdx = mergedFiles.findIndex(f => f.name === newFile.name);

                if (existingFileIdx !== -1) {
                  const existingFile = mergedFiles[existingFileIdx];
                  // If URL has changed (meaning file is updated in Drive), archive as version!
                  if (existingFile.url !== newFile.url) {
                    const newVersion = {
                      versionId: (existingFile.versions?.length || 0) + 1,
                      name: existingFile.name,
                      size: existingFile.size,
                      url: existingFile.url,
                      previewUrl: (existingFile as any).previewUrl || "",
                      uploadedBy: existingFile.uploadedBy,
                      date: existingFile.date,
                      isGoogleDrive: (existingFile as any).isGoogleDrive || false,
                      isRealUpload: existingFile.isRealUpload,
                      isMock: existingFile.isMock
                    };

                    const updatedFile = {
                      ...newFile,
                      versions: [newVersion, ...(existingFile.versions || [])]
                    };

                    mergedFiles[existingFileIdx] = updatedFile;
                  }
                } else {
                  mergedFiles.push(newFile);
                }
              });

              // Update the project's files list
              const projIdx = updatedProjects.findIndex(p => p.id === existingProj.id);
              updatedProjects[projIdx] = {
                ...existingProj,
                files: mergedFiles
              };
            } else {
              // Create a brand new project for this group of Drive files!
              updatedProjects.push({
                id: `proj-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: projName,
                status: "Discovery",
                deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                files: filesByProject[projName],
                comments: []
              });
            }
          });

          return {
            ...c,
            projects: updatedProjects
          };
        }
        return c;
      });

      saveClients(updated);
      if (data.isDemo) {
        alert("Synced Google Drive folder (Demo Mode: Connected successfully, displaying simulated files. Add GOOGLE_API_KEY to your Vercel project to sync your actual folder files!)");
      }
    } catch (e) {
      console.warn("Failed to sync GDrive folder:", e);
    }
  };

  // Trigger File Download
  const triggerDownload = (fileName: string) => {
    const element = document.createElement("a");
    const file = new Blob([`CONFIDENTIAL DATA FILE STUB: ${fileName}\nProduct Dept. Secure Operations Board`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Add Project Comment
  const handleAddComment = (e: React.FormEvent, projectId: string) => {
    e.preventDefault();
    if (!currentUser || !newCommentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      sender: currentUser.name,
      role: currentUser.role,
      text: newCommentText.trim(),
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const updatedClients = clients.map(client => {
      return {
        ...client,
        projects: client.projects.map(proj => {
          if (proj.id === projectId) {
            return {
              ...proj,
              comments: [...proj.comments, newComment]
            };
          }
          return proj;
        })
      };
    });

    saveClients(updatedClients);
    setNewCommentText("");
  };

  // Send Chat Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !chatInputText.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      sender: currentUser.name,
      role: currentUser.role,
      text: chatInputText.trim(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      deleted: false
    };

    const currentChatMsgs = messages[activeChat] || [];
    const updatedMessages = {
      ...messages,
      [activeChat]: [...currentChatMsgs, newMsg]
    };

    saveMessages(updatedMessages);
    setChatInputText("");
  };

  // Edit Chat Message
  const handleEditMessage = (msgId: string) => {
    const currentChatMsgs = messages[activeChat] || [];
    const updatedMessages = {
      ...messages,
      [activeChat]: currentChatMsgs.map(m => {
        if (m.id === msgId) {
          return { ...m, text: editingMessageText, edited: true };
        }
        return m;
      })
    };
    saveMessages(updatedMessages);
    setEditingMessageId(null);
  };

  // Delete Chat Message
  const handleDeleteMessage = (msgId: string) => {
    const currentChatMsgs = messages[activeChat] || [];
    const updatedMessages = {
      ...messages,
      [activeChat]: currentChatMsgs.map(m => {
        if (m.id === msgId) {
          return { ...m, text: "[Message deleted]", deleted: true };
        }
        return m;
      })
    };
    saveMessages(updatedMessages);
  };

  // Simulated Google Drive Link Flow
  const linkGoogleDrive = () => {
    setIsLinkingDrive(true);
    setTimeout(() => {
      setIsDriveLinked(true);
      setIsLinkingDrive(false);
      localStorage.setItem("sec_pm_drive_linked", "true");
    }, 2000);
  };

  // Simulated Import Drive File to Project
  const importDriveFile = (fileName: string, projectId: string) => {
    if (!currentUser) return;
    const newFile = {
      name: fileName,
      size: "Secure Shared Drive File",
      url: "",
      uploadedBy: currentUser.name,
      date: new Date().toISOString().split('T')[0],
      isMock: true,
      versions: []
    };

    const updatedClients = clients.map(client => {
      return {
        ...client,
        projects: client.projects.map(proj => {
          if (proj.id === projectId) {
            const existingFile = proj.files.find(f => f.name === fileName);
            if (existingFile) {
              const newVersion = {
                versionId: (existingFile.versions?.length || 0) + 1,
                name: existingFile.name,
                size: existingFile.size,
                url: existingFile.url,
                uploadedBy: existingFile.uploadedBy,
                date: existingFile.date,
                isMock: existingFile.isMock
              };
              return {
                ...proj,
                files: proj.files.map(f => f.name === fileName ? { ...newFile, versions: [newVersion, ...(existingFile.versions || [])] } : f)
              };
            }
            return {
              ...proj,
              files: [...proj.files, newFile]
            };
          }
          return proj;
        })
      };
    });
    saveClients(updatedClients);
  };

  // Toggle Client Collapse
  const toggleCollapse = (clientId: string) => {
    setCollapsedClients({
      ...collapsedClients,
      [clientId]: !collapsedClients[clientId]
    });
  };

  // Calculate countdown days remaining for archived item
  const getDaysRemaining = (archivedDateString: string) => {
    const archivedDate = new Date(archivedDateString);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - archivedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const remaining = 365 - diffDays;
    return remaining < 0 ? 0 : remaining;
  };

  // Extract all files under a specific client for navigation
  const getClientFilesList = (cId: string) => {
    const client = clients.find(c => c.id === cId);
    if (!client) return [];
    return client.projects.flatMap(p => 
      p.files.map(f => ({ ...f, clientId: cId, projectId: p.id }))
    );
  };

  // Navigate to Next/Prev file in single preview modal
  const handleNavigateFile = (direction: "prev" | "next") => {
    if (!previewFile || !previewFile.clientId) return;
    const list = getClientFilesList(previewFile.clientId);
    if (list.length <= 1) return;

    const idx = list.findIndex(f => f.name === previewFile.name);
    if (idx === -1) return;

    let targetIdx = 0;
    if (direction === "next") {
      targetIdx = (idx + 1) % list.length;
    } else {
      targetIdx = (idx - 1 + list.length) % list.length;
    }

    setPreviewFile(list[targetIdx]);
    setSelectedVersionId("active");
  };

  // Toggle version dropdown drawer inside main table row
  const toggleExpandedVersions = (fileKey: string) => {
    setExpandedVersions(prev => ({
      ...prev,
      [fileKey]: !prev[fileKey]
    }));
  };

  // Style colors mapping based on Dark Mode state
  const brandHighlight = isDarkMode ? "#facc15" : "#e31a1c";
  const bgColor = isDarkMode ? "#0b1528" : "#f9f4ef";
  const cardBg = isDarkMode ? "bg-[#12203f]" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const borderCol = isDarkMode ? "border-white/10" : "border-black/10";
  const dividerBg = isDarkMode ? "bg-white/10" : "bg-black/10";

  // If not logged in, show secure credential overlay (with email link reset flow support)
  if (!isLoggedIn || !currentUser) {
    return (
      <main
        style={{
          backgroundColor: bgColor,
          color: isDarkMode ? "#ffffff" : "#000000",
          "--background": bgColor,
          "--foreground": isDarkMode ? "#ffffff" : "#000000",
          fontFamily: "var(--font-neue-haas), sans-serif"
        } as React.CSSProperties}
        className="w-full min-h-screen flex flex-col items-center justify-center pt-[72px] px-4 font-medium transition-colors duration-500 bg-background"
      >
        <div className="absolute top-24 right-8 z-30">
          <button
            onClick={toggleDarkMode}
            className={`p-2.5 rounded-full border cursor-pointer transition-all ${
              isDarkMode ? "bg-white/5 border-white/20 text-white hover:bg-white/10" : "bg-black/5 border-black/10 text-black hover:bg-black/10"
            }`}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`w-full max-w-md border rounded-xl shadow-xl p-8 flex flex-col gap-6 transition-colors duration-500 ${cardBg} ${borderCol}`}
        >
          <div className={`flex flex-col items-center text-center gap-3 border-b pb-6 ${borderCol}`}>
            <div className={`h-14 w-14 border rounded-full flex items-center justify-center ${isDarkMode ? "bg-white/5 border-white/15" : "bg-black/5 border-black/10"}`}>
              <Lock size={24} className={textColor} />
            </div>
            <div>
              <h2 className="text-xl font-header font-black tracking-wider uppercase text-foreground">Secure portal</h2>
              <span className={`text-[9px] uppercase tracking-widest font-mono block mt-1.5 leading-relaxed ${isDarkMode ? "text-white/60" : "text-black/55"}`}>
                Confidential operations interface &bull; Authorized only
              </span>
            </div>
          </div>

          {loginError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-700 text-xs px-4 py-3 rounded-lg flex items-center gap-2 font-mono">
              <AlertCircle size={16} className="shrink-0" />
              <span className="lowercase first-letter:uppercase">{loginError}</span>
            </div>
          )}

          {/* VIEW 1: SECURE LOGIN FORM */}
          {authView === "login" && (
            <div className="flex flex-col gap-4">
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-white/60" : "text-black/60"}`}>Corporate email</label>
                  <input
                    type="email"
                    required
                    placeholder="Email@productdept.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={`border bg-transparent text-xs font-mono px-3 py-2.5 outline-none rounded transition-all lowercase ${isDarkMode ? "border-white/20 focus:border-white text-white" : "border-black/20 focus:border-black text-black"}`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-white/60" : "text-black/60"}`}>Access key (password)</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={`border bg-transparent text-xs px-3 py-2.5 outline-none rounded transition-all ${isDarkMode ? "border-white/20 focus:border-white text-white" : "border-black/20 focus:border-black text-black"}`}
                  />
                </div>
                <button
                  type="submit"
                  style={{ backgroundColor: brandHighlight, color: isDarkMode ? "#000000" : "#ffffff" }}
                  className="font-bold uppercase tracking-widest text-xs py-3 rounded cursor-pointer mt-2 transition-all"
                >
                  Authenticate session
                </button>
              </form>

              <button
                type="button"
                onClick={() => {
                  setAuthView("forgot");
                  setLoginError("");
                }}
                className={`text-[10px] text-center font-bold uppercase tracking-widest cursor-pointer mt-2 ${isDarkMode ? "text-white/50 hover:text-yellow-400" : "text-black/50 hover:text-[#e31a1c]"}`}
              >
                Set or reset access key
              </button>
            </div>
          )}

          {/* VIEW 2: REQUEST VERIFICATION LINK (FORGOT) */}
          {authView === "forgot" && (
            <div className="flex flex-col gap-4">
              <span className={`text-[11px] leading-relaxed text-center font-mono uppercase ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                To set your access key, we will transmit a verification link to your corporate mailbox.
              </span>
              
              <form onSubmit={handleRequestVerificationLink} className="flex flex-col gap-4 mt-2">
                <div className="flex flex-col gap-2">
                  <label className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-white/60" : "text-black/60"}`}>Corporate email</label>
                  <input
                    type="email"
                    required
                    placeholder="Email@productdept.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className={`border bg-transparent text-xs font-mono px-3 py-2.5 outline-none rounded transition-all lowercase ${isDarkMode ? "border-white/20 focus:border-white text-white" : "border-black/20 focus:border-black text-black"}`}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSendingLink}
                  style={{ backgroundColor: brandHighlight, color: isDarkMode ? "#000000" : "#ffffff" }}
                  className="disabled:opacity-50 font-bold uppercase tracking-widest text-xs py-3 rounded cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  {isSendingLink ? (
                    <>
                      <span className={`h-3.5 w-3.5 border-2 rounded-full animate-spin ${isDarkMode ? "border-black border-t-transparent" : "border-white border-t-transparent"}`} />
                      <span>Transmitting key...</span>
                    </>
                  ) : (
                    "Transmit verification link"
                  )}
                </button>
              </form>

              <button
                type="button"
                onClick={() => {
                  setAuthView("login");
                  setLoginError("");
                  setSimulatedEmailSentTo(null);
                }}
                className={`text-[10px] text-center font-bold uppercase tracking-widest cursor-pointer mt-2 ${isDarkMode ? "text-white/50 hover:text-yellow-400" : "text-black/50 hover:text-[#e31a1c]"}`}
              >
                Return to login
              </button>
            </div>
          )}

          {/* VIEW 3: SET NEW PASSWORD */}
          {authView === "set-password" && (
            <div className="flex flex-col gap-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-[10px] px-4 py-2.5 rounded flex items-center gap-2 font-mono uppercase">
                <ShieldCheck size={14} className="shrink-0" />
                <span>Identity verified for: {setPasswordEmail}</span>
              </div>

              {setPasswordError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-700 text-xs px-4 py-3 rounded-lg flex items-center gap-2 font-mono">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{setPasswordError}</span>
                </div>
              )}

              <form onSubmit={handleSavePassword} className="flex flex-col gap-4 mt-2">
                <div className="flex flex-col gap-2">
                  <label className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-white/60" : "text-black/60"}`}>New access key (min 6 characters)</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`border bg-transparent text-xs px-3 py-2.5 outline-none rounded transition-all ${isDarkMode ? "border-white/20 focus:border-white text-white" : "border-black/20 focus:border-black text-black"}`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-white/60" : "text-black/60"}`}>Confirm access key</label>
                  <input
                    type="password"
                    required
                    placeholder="Re-enter password"
                    value={newPasswordConfirm}
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    className={`border bg-transparent text-xs px-3 py-2.5 outline-none rounded transition-all ${isDarkMode ? "border-white/20 focus:border-white text-white" : "border-black/20 focus:border-black text-black"}`}
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-xs py-3 rounded cursor-pointer transition-all"
                >
                  Save passkey & authenticate
                </button>
              </form>
            </div>
          )}

          <div className={`border rounded p-3 text-[10px] font-mono leading-relaxed uppercase ${isDarkMode ? "bg-white/5 border-white/10 text-white/50" : "bg-black/[0.02] border-black/5 text-black/50"}`}>
            <strong>Corporate profiles:</strong><br />
            Ryan: ryan@productdept.com<br />
            Eddie: eddie@productdept.com
          </div>
        </motion.div>

        {/* SIMULATED CORPORATE MAIL SERVER (PREVIEW) */}
        <AnimatePresence>
          {simulatedEmailSentTo && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-xl shadow-2xl p-6 mt-8 text-white font-mono text-xs flex flex-col gap-4"
            >
              <div className="border-b border-white/10 pb-3 flex justify-between items-center text-[10px] uppercase text-white/50 tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Mail size={12} className="text-[#10b981]" />
                  Corporate mail server (preview)
                </span>
                <span className="bg-[#10b981]/20 text-[#10b981] px-1.5 py-0.5 rounded text-[8px] font-bold">
                  Received just now
                </span>
              </div>

              <div className="flex flex-col gap-1.5 border-b border-white/5 pb-3">
                <p><span className="text-white/40">From:</span> secure-auth@productdept.com</p>
                <p><span className="text-white/40">To:</span> {simulatedEmailSentTo}</p>
                <p><span className="text-white/40">Subject:</span> Access key verification link</p>
              </div>

              <p className="text-white/70 leading-relaxed text-[11px] uppercase">
                A verification link has been requested to establish or update your access key. To complete authentication and configure your passcode, click the link below:
              </p>

              <button
                onClick={() => {
                  setSetPasswordEmail(simulatedEmailSentTo);
                  setAuthView("set-password");
                  setSimulatedEmailSentTo(null);
                  setForgotEmail("");
                }}
                className="bg-[#10b981] hover:bg-[#0ea56d] text-zinc-950 font-bold uppercase tracking-wider text-[10px] py-3 rounded cursor-pointer text-center mt-2 transition-all font-sans"
              >
                Verify email & set passkey
              </button>

              <button
                onClick={() => setSimulatedEmailSentTo(null)}
                className="text-[9px] text-white/40 hover:text-white uppercase text-center mt-1 cursor-pointer"
              >
                Dismiss email notification
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    );
  }

  // Calculate filtered messages
  const currentChatMsgs = messages[activeChat] || [];
  const filteredChatMsgs = currentChatMsgs.filter(m => 
    m.text.toLowerCase().includes(chatSearchQuery.toLowerCase()) ||
    m.sender.toLowerCase().includes(chatSearchQuery.toLowerCase())
  );

  return (
    <main
      style={{
        backgroundColor: bgColor,
        color: isDarkMode ? "#ffffff" : "#000000",
        "--background": bgColor,
        "--foreground": isDarkMode ? "#ffffff" : "#000000",
        fontFamily: "var(--font-neue-haas), sans-serif"
      } as React.CSSProperties}
      className={`relative w-full min-h-screen pt-[72px] font-medium transition-colors duration-500 bg-background text-foreground`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Profile / Demo Bar */}
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center border rounded-lg p-4 mb-8 gap-4 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`}>
          <div>
            <span style={{ color: brandHighlight }} className="font-header font-black tracking-widest text-[9px] uppercase block mb-1">
              Active security status
            </span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
              <p className="text-xs font-mono">Logged in as: <span className="font-bold">{currentUser.name} ({currentUser.role})</span></p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded border cursor-pointer flex items-center justify-center transition-all ${
                isDarkMode ? "bg-white/5 border-white/20 text-white hover:bg-white/10" : "bg-black/5 border-black/10 text-black hover:bg-black/10"
              }`}
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-black text-white hover:bg-black/85 px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-all cursor-pointer"
            >
              <LogOut size={12} />
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Frame */}
        <div className={`grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 border rounded-xl overflow-hidden min-h-[650px] shadow-sm ${cardBg} ${borderCol}`}>
          
          {/* Sidebar Menu */}
          <div className={`border-r p-6 flex flex-col justify-between ${isDarkMode ? "bg-white/[0.01] border-white/10" : "bg-black/[0.01] border-black/10"}`}>
            <div className="flex flex-col gap-6">
              <div className={`border-b pb-4 ${borderCol}`}>
                <span className="font-header font-black tracking-wider text-lg block">
                  PROJECT MGMT.
                </span>
                <span className={`text-[9px] uppercase tracking-widest font-mono block mt-1 ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
                  Secure workspace
                </span>
              </div>

              {/* Sidebar Tabs */}
              <nav className="flex flex-col gap-1.5">
                {[
                  { id: "dashboard", label: "Dashboard overview", icon: Briefcase },
                  { id: "projects", label: "Client projects", icon: CheckSquare },
                  { id: "chat", label: "Secure communications", icon: MessageSquare },
                  { id: "storage", label: "Drive storage sync", icon: Cloud },
                  { id: "archive", label: "Archive vault", icon: Archive }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={isActive ? { backgroundColor: brandHighlight, color: isDarkMode ? "#000000" : "#ffffff" } : {}}
                      className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? "shadow-md"
                          : isDarkMode ? "text-white/60 hover:bg-white/5 hover:text-white" : "text-black/60 hover:bg-black/[0.04] hover:text-black"
                      }`}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className={`text-[10px] font-mono border-t pt-4 mt-6 ${borderCol} ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
              <p>Product Department Inc.</p>
              <p className="mt-1 text-[8px] opacity-75">Secure shell &bull; AES encrypted</p>
            </div>
          </div>

          {/* Right Workspaces Panel */}
          <div className="p-6 md:p-8 flex flex-col min-h-0 relative">
            
            {/* Global dropdown options block */}
            <AnimatePresence>
              {activeMenuId && (
                <div 
                  ref={menuRef}
                  className={`absolute z-30 w-40 border rounded shadow-lg py-1 text-xs font-mono uppercase bg-white border-black/10 text-black`}
                  style={{
                    right: "24px",
                    top: "60px"
                  }}
                >
                  {activeMenuId.startsWith("client-") ? (
                    <>
                      <button
                        onClick={() => {
                          const client = clients.find(c => c.id === activeMenuId);
                          if (client) {
                            setEditingClientId(client.id);
                            setEditingClientText(client.name);
                          }
                          setActiveMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-black/5 cursor-pointer flex items-center gap-2"
                      >
                        <Edit3 size={11} /> Rename client
                      </button>
                      <button
                        onClick={() => handleArchiveClient(activeMenuId)}
                        className="w-full text-left px-4 py-2 hover:bg-black/5 cursor-pointer flex items-center gap-2"
                      >
                        <Archive size={11} /> Archive client
                      </button>
                      <button
                        onClick={() => handleDeleteClient(activeMenuId)}
                        className="w-full text-left px-4 py-2 hover:bg-black/5 text-[#e31a1c] cursor-pointer flex items-center gap-2"
                      >
                        <Trash2 size={11} /> Delete client
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          let projName = "";
                          clients.forEach(c => {
                            const found = c.projects.find(p => p.id === activeMenuId);
                            if (found) projName = found.name;
                          });
                          setEditingProjectId(activeMenuId);
                          setEditingProjectText(projName);
                          setActiveMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-black/5 cursor-pointer flex items-center gap-2"
                      >
                        <Edit3 size={11} /> Rename project
                      </button>
                      <button
                        onClick={() => handleArchiveProject(activeMenuId)}
                        className="w-full text-left px-4 py-2 hover:bg-black/5 cursor-pointer flex items-center gap-2"
                      >
                        <Archive size={11} /> Archive project
                      </button>
                      <button
                        onClick={() => handleDeleteProject(activeMenuId)}
                        className="w-full text-left px-4 py-2 hover:bg-black/5 text-[#e31a1c] cursor-pointer flex items-center gap-2"
                      >
                        <Trash2 size={11} /> Delete project
                      </button>
                    </>
                  )}
                </div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              
              {/* TAB 1: OVERVIEW DASHBOARD */}
              {activeTab === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex flex-col gap-8 h-full"
                >
                  <div className={`border-b pb-4 ${borderCol}`}>
                    <h2 className="text-2xl font-header font-black tracking-tight uppercase">Dashboard overview</h2>
                    <p className={`text-sm mt-1 ${isDarkMode ? "text-white/50" : "text-black/50"}`}>High-level team overview, deliverables, and sync status.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className={`border rounded-lg p-5 flex flex-col justify-between ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/[0.02] border-black/10"}`}>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-white/50" : "text-black/50"}`}>Active clients</span>
                      <p style={{ color: brandHighlight }} className="text-4xl font-header font-black mt-2">{clients.length}</p>
                      <button onClick={() => setActiveTab("projects")} className={`text-[10px] font-bold uppercase tracking-widest mt-4 text-left cursor-pointer hover:underline ${textColor}`}>
                        View boards &rarr;
                      </button>
                    </div>
                    <div className={`border rounded-lg p-5 flex flex-col justify-between ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/[0.02] border-black/10"}`}>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-white/50" : "text-black/50"}`}>Total projects</span>
                      <p className="text-4xl font-header font-black mt-2">
                        {clients.reduce((acc, curr) => acc + curr.projects.length, 0)}
                      </p>
                      <button onClick={() => setActiveTab("projects")} className={`text-[10px] font-bold uppercase tracking-widest mt-4 text-left cursor-pointer hover:underline ${textColor}`}>
                        Track updates &rarr;
                      </button>
                    </div>
                    <div className={`border rounded-lg p-5 flex flex-col justify-between ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/[0.02] border-black/10"}`}>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-white/50" : "text-black/50"}`}>Cloud sync status</span>
                      <p className="text-sm font-bold mt-2 flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${isDriveLinked ? 'bg-[#10b981]' : 'bg-[#e31a1c]'}`} />
                        {isDriveLinked ? "Linked to GDrive" : "Disconnected"}
                      </p>
                      <button onClick={() => setActiveTab("storage")} className={`text-[10px] font-bold uppercase tracking-widest mt-6 text-left cursor-pointer hover:underline ${textColor}`}>
                        {isDriveLinked ? "Manage storage" : "Connect drive"} &rarr;
                      </button>
                    </div>
                  </div>

                  <div className={`border rounded-lg p-6 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/[0.02] border-black/10"}`}>
                    <h3 style={{ color: brandHighlight }} className="text-xs font-bold uppercase tracking-widest mb-4">Latest client deliverables</h3>
                    <div className={`divide-y ${isDarkMode ? "divide-white/10" : "divide-black/10"}`}>
                      {clients.flatMap(c => c.projects.flatMap(p => p.files.map(f => ({ ...f, clientName: c.name, projName: p.name })))).map((file, idx) => (
                        <div key={idx} className="flex justify-between items-center py-3.5 first:pt-0 last:pb-0">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider">{file.name}</p>
                            <p className={`text-[10px] font-mono mt-0.5 ${isDarkMode ? "text-white/50" : "text-black/50"}`}>{file.clientName} &bull; {file.projName} &bull; Uploaded by {file.uploadedBy}</p>
                          </div>
                          <button 
                            onClick={() => file.isRealUpload && file.url ? triggerDownload(file.url) : triggerDownload(file.name)}
                            className={`p-2 border rounded cursor-pointer ${isDarkMode ? "border-white/15 hover:bg-white/5" : "border-black/15 hover:bg-black/5"}`}
                          >
                            <Download size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: PROJECTS BOARD */}
              {activeTab === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex flex-col gap-6 h-full"
                >
                  <div className={`border-b pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 ${borderCol}`}>
                    <div>
                      <h2 className="text-2xl font-header font-black tracking-tight uppercase">Client project boards</h2>
                      <p className={`text-sm mt-1 ${isDarkMode ? "text-white/50" : "text-black/50"}`}>
                        Smart organization tracking client project deliverables and deadlines. Drag & drop files directly onto clients to instantly generate projects or build file versions.
                      </p>
                    </div>

                    <form onSubmit={handleAddClient} className="flex gap-2 w-full md:w-auto">
                      <input 
                        type="text" 
                        placeholder="New client name"
                        value={newClientName}
                        onChange={(e) => setNewClientName(e.target.value)}
                        className={`border px-3 py-2 text-xs font-mono uppercase bg-transparent outline-none rounded ${isDarkMode ? "border-white/20 focus:border-white text-white" : "border-black/20 focus:border-black text-black"}`}
                      />
                      <button 
                        type="submit"
                        className="bg-black hover:bg-black/85 text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer rounded"
                      >
                        <Plus size={14} />
                        Add client
                      </button>
                    </form>
                  </div>

                  <div className="flex flex-col gap-8">
                    {clients.map(client => {
                      const isCollapsed = collapsedClients[client.id];
                      const isEditingClient = editingClientId === client.id;
                      const isDraggingOverThisClient = draggingClientId === client.id;

                      const clientSelectedKeys = Object.keys(selectedFiles).filter(
                        key => key.startsWith(`${client.id}__`) && selectedFiles[key]
                      );
                      const hasSelectedFiles = clientSelectedKeys.length > 0;
                      
                      const clientFiles = getClientFilesList(client.id);

                      return (
                        <div 
                          key={client.id} 
                          onDragOver={(e) => handleDragOver(e, client.id)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDropFiles(e, client.id)}
                          className={`border rounded-lg overflow-hidden shadow-sm transition-all duration-300 relative ${cardBg} ${borderCol} ${
                            isDraggingOverThisClient 
                              ? isDarkMode ? "ring-2 ring-yellow-400 scale-[1.01] bg-white/5" : "ring-2 ring-red-500 scale-[1.01] bg-black/5"
                              : ""
                          }`}
                        >
                          {isDraggingOverThisClient && (
                            <div className="absolute inset-0 bg-transparent pointer-events-none flex items-center justify-center z-10">
                              <div className={`px-6 py-3 border border-dashed rounded-lg flex items-center gap-2 font-mono text-[11px] uppercase ${
                                isDarkMode ? "bg-[#0b1528] border-yellow-400 text-yellow-400" : "bg-[#f9f4ef] border-red-500 text-red-500"
                              }`}>
                                <Upload size={14} className="animate-bounce" />
                                <span>Drop files to auto-generate projects</span>
                              </div>
                            </div>
                          )}
                          
                          {/* Client Header */}
                          <div 
                            onClick={() => toggleCollapse(client.id)}
                            className={`border-b px-5 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 cursor-pointer select-none ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/[0.03] border-black/10"}`}
                          >
                            <div className="flex items-center gap-2 flex-grow min-w-0" onClick={(e) => isEditingClient && e.stopPropagation()}>
                              {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                              
                              {isEditingClient ? (
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="text"
                                    value={editingClientText}
                                    onChange={(e) => setEditingClientText(e.target.value)}
                                    className="border bg-white px-2 py-1 text-xs font-mono uppercase outline-none focus:border-black rounded text-black"
                                    autoFocus
                                  />
                                  <button
                                    onClick={() => handleUpdateClientName(client.id)}
                                    className="bg-emerald-500 text-white px-2 py-1 rounded text-[9px] font-bold cursor-pointer"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingClientId(null)}
                                    className="bg-black/5 border border-black/10 text-black px-2 py-1 rounded text-[9px] font-bold cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 truncate">
                                  <span style={{ color: brandHighlight }} className="font-header font-black uppercase text-sm tracking-widest">
                                    {client.name}
                                  </span>
                                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isDarkMode ? "bg-white/10 text-white/70" : "bg-black/5 text-black/40"}`}>
                                    {client.projects.length} Projects
                                  </span>
                                  
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveMenuId(activeMenuId === client.id ? null : client.id);
                                    }}
                                    className={`p-1 rounded cursor-pointer ${isDarkMode ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"}`}
                                  >
                                    <MoreVertical size={14} />
                                  </button>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => {
                                  if ((client as any).gdriveFolderId) {
                                    syncGoogleDriveFolder(client.id, (client as any).gdriveFolderId);
                                  } else {
                                    handleConnectGoogleDriveFolder(client.id);
                                  }
                                }}
                                className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 border rounded cursor-pointer transition-all flex items-center gap-1.5 ${
                                  (client as any).gdriveFolderId
                                    ? "bg-blue-500/10 border-blue-500/30 text-blue-500 hover:bg-blue-500/20"
                                    : isDarkMode ? "border-white/10 hover:bg-white/5 text-white" : "border-black/10 hover:bg-black/5 text-black"
                                }`}
                                title={(client as any).gdriveFolderId ? `Folder ID: ${(client as any).gdriveFolderId}` : "Link shared Google Drive folder"}
                              >
                                <Cloud size={11} />
                                <span>{(client as any).gdriveFolderId ? "Sync GDrive folder" : "Link GDrive folder"}</span>
                              </button>

                              {clientFiles.length > 0 && (
                                <button
                                  onClick={() => setMosaicClientId(client.id)}
                                  className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 border rounded cursor-pointer transition-all flex items-center gap-1.5 ${
                                    isDarkMode ? "border-white/10 hover:bg-white/5 text-white" : "border-black/10 hover:bg-black/5 text-black"
                                  }`}
                                >
                                  <Grid size={11} />
                                  Preview all files
                                </button>
                              )}

                              {hasSelectedFiles && (
                                <button
                                  onClick={() => handleBatchDownload(client.id)}
                                  style={{ backgroundColor: brandHighlight, color: isDarkMode ? "#000000" : "#ffffff" }}
                                  className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded cursor-pointer transition-all flex items-center gap-1.5"
                                >
                                  <Download size={11} />
                                  Download selected ({clientSelectedKeys.length})
                                </button>
                              )}

                              <input 
                                type="text"
                                placeholder="New project"
                                value={newProjectName[client.id] || ""}
                                onChange={(e) => setNewProjectName({ ...newProjectName, [client.id]: e.target.value })}
                                className="border bg-white px-2 py-1 text-[10px] font-mono uppercase outline-none focus:border-black rounded w-32 text-black"
                              />
                              <button 
                                onClick={() => handleAddProject(client.id)}
                                style={{ backgroundColor: brandHighlight, color: isDarkMode ? "#000000" : "#ffffff" }}
                                className="p-1.5 rounded cursor-pointer"
                                title="Add project"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>

                          {!isCollapsed && (
                            <div className="overflow-x-auto">
                              {client.projects.length === 0 ? (
                                <div className="p-8 text-center text-xs text-black/40 font-mono">
                                  No projects in this client dashboard. Add one above or drag files here!
                                </div>
                              ) : (
                                <table className="w-full text-left text-xs font-mono uppercase border-collapse">
                                  <thead>
                                    <tr className={`border-b text-[10px] ${isDarkMode ? "bg-white/5 border-white/10 text-white/50" : "bg-black/[0.01] border-black/10 text-black/55"}`}>
                                      <th className="p-4 font-bold">Project name</th>
                                      <th className="p-4 font-bold w-[130px]">Status</th>
                                      <th className="p-4 font-bold w-[140px]">Deadline</th>
                                      <th className="p-4 font-bold w-[210px]">Files & version control</th>
                                      <th className="p-4 font-bold w-[140px] text-right">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody className={`divide-y ${isDarkMode ? "divide-white/10" : "divide-black/10"}`}>
                                    {client.projects.map(project => {
                                      const isEditingProject = editingProjectId === project.id;
                                      
                                      return (
                                        <tr key={project.id} className={isDarkMode ? "hover:bg-white/[0.01]" : "hover:bg-black/[0.01]"}>
                                          <td className={`p-4 font-bold max-w-[200px] break-words ${isDarkMode ? "text-white/90" : "text-black/85"}`}>
                                            {isEditingProject ? (
                                              <div className="flex items-center gap-1">
                                                <input 
                                                  type="text"
                                                  value={editingProjectText}
                                                  onChange={(e) => setEditingProjectText(e.target.value)}
                                                  className="border border-black/20 bg-white px-2 py-1 text-[10px] font-mono uppercase outline-none focus:border-black rounded w-full text-black"
                                                />
                                                <button
                                                  onClick={() => handleUpdateProjectName(project.id)}
                                                  className="bg-emerald-500 text-white px-2 py-1 rounded text-[8px] font-bold cursor-pointer"
                                                >
                                                  Save
                                                </button>
                                                <button
                                                  onClick={() => setEditingProjectId(null)}
                                                  className="bg-black/5 border border-black/10 text-black px-2 py-1 rounded text-[8px] font-bold cursor-pointer"
                                                >
                                                  Cancel
                                                </button>
                                              </div>
                                            ) : (
                                              <div className="flex items-center gap-2">
                                                <span className="font-header font-black tracking-wide text-xs">{project.name}</span>
                                              </div>
                                            )}
                                          </td>
                                          <td className="p-4">
                                            <select
                                              value={project.status}
                                              onChange={(e) => handleStatusChange(project.id, e.target.value)}
                                              className={`px-3 py-1.5 rounded text-[10px] font-bold outline-none border cursor-pointer ${
                                                project.status === "Completed" ? "bg-emerald-500/10 border-emerald-500 text-emerald-700" :
                                                project.status === "Mass Production" ? "bg-orange-500/10 border-orange-500 text-orange-700" :
                                                project.status === "Tooling" ? "bg-amber-500/10 border-amber-500 text-amber-700" :
                                                project.status === "Design" ? "bg-blue-500/10 border-blue-500 text-blue-700" :
                                                "bg-gray-500/10 border-gray-500 text-gray-700"
                                              }`}
                                            >
                                              <option value="Discovery">Discovery</option>
                                              <option value="Design">Design</option>
                                              <option value="Tooling">Tooling</option>
                                              <option value="Mass Production">Mass Production</option>
                                              <option value="Completed">Completed</option>
                                            </select>
                                          </td>
                                          <td className="p-4">
                                            <input 
                                              type="date"
                                              value={project.deadline}
                                              onChange={(e) => handleDeadlineChange(project.id, e.target.value)}
                                              className={`bg-transparent border rounded px-2 py-1 outline-none text-[11px] w-full ${isDarkMode ? "border-white/20 text-white" : "border-black/10 text-black"}`}
                                            />
                                          </td>
                                          <td className="p-4">
                                            <div className="flex flex-col gap-2">
                                              {project.files.map((file, fIdx) => {
                                                const fileKey = `${client.id}__${project.id}__${file.name}`;
                                                const isChecked = !!selectedFiles[fileKey];
                                                const hasVersions = file.versions && file.versions.length > 0;
                                                const isVersionsExpanded = !!expandedVersions[fileKey];

                                                return (
                                                  <div key={fIdx} className="flex flex-col gap-1.5 border-b border-black/[0.02] dark:border-white/[0.02] pb-2.5 last:border-0 last:pb-0">
                                                    
                                                    {/* Primary File Row */}
                                                    <div className="flex items-center justify-between gap-1 text-[10px]">
                                                      <div className="flex items-center gap-1.5 truncate max-w-[130px]">
                                                        <button 
                                                          onClick={() => toggleFileSelection(fileKey)}
                                                          className={`focus:outline-none cursor-pointer p-0.5 rounded transition-all ${
                                                            isChecked ? isDarkMode ? "text-yellow-400" : "text-red-500" : isDarkMode ? "text-white/30 hover:text-white" : "text-black/30 hover:text-black"
                                                          }`}
                                                        >
                                                          <CheckSquare size={13} style={{ fill: isChecked ? "currentColor" : "none" }} />
                                                        </button>

                                                        <span 
                                                          onClick={() => file.isRealUpload && file.url ? triggerDownload(file.url) : triggerDownload(file.name)}
                                                          style={{ color: brandHighlight }}
                                                          className="hover:underline cursor-pointer truncate font-mono" 
                                                          title={`Download ${file.name} (Uploaded by ${file.uploadedBy})`}
                                                        >
                                                          {file.name}
                                                        </span>

                                                        {/* Version Count Badge */}
                                                        {hasVersions && (
                                                          <span 
                                                            onClick={() => toggleExpandedVersions(fileKey)}
                                                            className={`px-1.5 py-0.5 rounded text-[8px] font-bold cursor-pointer transition-all ${
                                                              isVersionsExpanded 
                                                                ? "bg-emerald-500 text-white" 
                                                                : isDarkMode ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/35" : "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20"
                                                            }`}
                                                            title="Toggle version history"
                                                          >
                                                            v{file.versions.length + 1}
                                                          </span>
                                                        )}
                                                      </div>

                                                      <button
                                                        onClick={() => setPreviewFile({ ...file, clientId: client.id })}
                                                        className={`p-1 border rounded cursor-pointer transition-all flex items-center justify-center shrink-0 ${
                                                          isDarkMode ? "border-white/10 hover:bg-white/5 text-white/60 hover:text-white" : "border-black/10 hover:bg-black/5 text-black/60 hover:text-black"
                                                        }`}
                                                        title="Preview Active File"
                                                      >
                                                        <Eye size={11} />
                                                      </button>
                                                    </div>

                                                    {/* Expanded Version History Drawer */}
                                                    <AnimatePresence>
                                                      {isVersionsExpanded && hasVersions && (
                                                        <motion.div
                                                          initial={{ opacity: 0, height: 0 }}
                                                          animate={{ opacity: 1, height: "auto" }}
                                                          exit={{ opacity: 0, height: 0 }}
                                                          className={`flex flex-col gap-1.5 overflow-hidden pl-5 border-l mt-1.5 ${isDarkMode ? "border-white/10" : "border-black/10"}`}
                                                        >
                                                          {file.versions.map((ver: any, vIdx: number) => (
                                                            <div key={vIdx} className="flex justify-between items-center text-[9px] font-mono text-foreground/60 py-0.5">
                                                              <span className="truncate max-w-[100px]" title={`Uploaded by ${ver.uploadedBy} on ${ver.date}`}>
                                                                v{ver.versionId} &bull; {ver.date} ({ver.size})
                                                              </span>
                                                              <div className="flex gap-1.5 shrink-0">
                                                                {/* Preview version */}
                                                                <button
                                                                  onClick={() => setPreviewFile({ ...file, clientId: client.id, initialSelectedVersionId: String(ver.versionId) })}
                                                                  className={`hover:opacity-75 cursor-pointer`}
                                                                  title={`Preview Version ${ver.versionId}`}
                                                                >
                                                                  <Eye size={9} />
                                                                </button>
                                                                {/* Download version */}
                                                                <button
                                                                  onClick={() => ver.isRealUpload && ver.url ? triggerDownload(ver.url) : triggerDownload(ver.name)}
                                                                  className={`hover:opacity-75 cursor-pointer`}
                                                                  title={`Download Version ${ver.versionId}`}
                                                                >
                                                                  <Download size={9} />
                                                                </button>
                                                              </div>
                                                            </div>
                                                          ))}
                                                        </motion.div>
                                                      )}
                                                    </AnimatePresence>

                                                  </div>
                                                );
                                              })}
                                              
                                              <div className="flex flex-wrap items-center gap-2 mt-1">
                                                <label className={`text-[9px] font-bold cursor-pointer flex items-center gap-1 ${isDarkMode ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black"}`}>
                                                  <Upload size={10} />
                                                  <span>Upload file</span>
                                                  <input 
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => handleFileUpload(e, project.id)}
                                                  />
                                                </label>
                                                <span className="opacity-20">&bull;</span>
                                                <button
                                                  onClick={() => {
                                                    const url = prompt("Paste Google Drive shared link (e.g., https://drive.google.com/file/d/...):");
                                                    if (url) handleAddGoogleDriveLink(url, project.id);
                                                  }}
                                                  className={`text-[9px] font-bold cursor-pointer flex items-center gap-1 ${isDarkMode ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black"}`}
                                                >
                                                  <Paperclip size={10} />
                                                  <span>Link GDrive file</span>
                                                </button>
                                              </div>
                                            </div>
                                          </td>
                                          <td className="p-4 text-right">
                                            <div className="flex justify-end items-center gap-2">
                                              <button
                                                onClick={() => setOpenCommentsProjectId(openCommentsProjectId === project.id ? null : project.id)}
                                                className={`text-[9px] font-bold px-2 py-1.5 border rounded cursor-pointer flex items-center gap-1 ${isDarkMode ? "border-white/15 hover:bg-white/5" : "border-black/15 hover:bg-black/5"}`}
                                                title="View notes & comments"
                                              >
                                                <MessageSquare size={10} />
                                                <span>Notes ({project.comments.length})</span>
                                              </button>
                                              
                                              <button 
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setActiveMenuId(activeMenuId === project.id ? null : project.id);
                                                }}
                                                className={`p-1.5 rounded cursor-pointer border ${isDarkMode ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"}`}
                                                title="Project actions"
                                              >
                                                <MoreVertical size={13} />
                                              </button>
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {openCommentsProjectId && (() => {
                      const activeProject = clients.flatMap(c => c.projects).find(p => p.id === openCommentsProjectId);
                      if (!activeProject) return null;

                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          className={`border rounded-lg p-5 flex flex-col gap-4 mt-4 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/[0.02] border-black/10"}`}
                        >
                          <div className={`flex justify-between items-center border-b pb-3 ${borderCol}`}>
                            <span className="font-header font-black uppercase text-xs tracking-wider">
                              Notes & comments thread: {activeProject.name}
                            </span>
                            <button 
                              onClick={() => setOpenCommentsProjectId(null)}
                              className={`font-bold cursor-pointer ${isDarkMode ? "text-white/55 hover:text-white" : "text-black/50 hover:text-black"}`}
                            >
                              ✕
                            </button>
                          </div>

                          <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-2">
                            {activeProject.comments.length === 0 ? (
                              <p className={`text-[10px] font-mono py-4 text-center ${isDarkMode ? "text-white/40" : "text-black/45"}`}>No comments or notes yet. Write the first one!</p>
                            ) : (
                              activeProject.comments.map(c => (
                                <div key={c.id} className={`border rounded-lg p-3 flex flex-col gap-1.5 shadow-sm ${isDarkMode ? "bg-zinc-950/20 border-white/5" : "bg-white border-black/5"}`}>
                                  <div className="flex justify-between items-baseline">
                                    <span style={{ color: brandHighlight }} className="text-[9px] font-bold uppercase tracking-wider">
                                      {c.sender} <span className={`font-normal ${isDarkMode ? "text-white/50" : "text-black/40"}`}>({c.role})</span>
                                    </span>
                                    <span className={`text-[8px] font-mono ${isDarkMode ? "text-white/50" : "text-black/45"}`}>{c.date}</span>
                                  </div>
                                  <p className="text-xs font-mono lowercase first-letter:uppercase">{c.text}</p>
                                </div>
                              ))
                            )}
                          </div>

                          <form onSubmit={(e) => handleAddComment(e, activeProject.id)} className="flex gap-2">
                            <input 
                              type="text"
                              placeholder="Write a note or update for the team..."
                              value={newCommentText}
                              onChange={(e) => setNewCommentText(e.target.value)}
                              className={`flex-grow border text-xs font-mono uppercase px-3 py-2 outline-none rounded ${
                                isDarkMode ? "border-white/20 bg-white/5 text-white focus:border-white" : "border-black/25 bg-white text-black focus:border-black"
                              }`}
                            />
                            <button
                              type="submit"
                              style={{ backgroundColor: brandHighlight, color: isDarkMode ? "#000000" : "#ffffff" }}
                              className="text-[10px] font-bold uppercase tracking-widest px-4 rounded cursor-pointer"
                            >
                              Submit
                            </button>
                          </form>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* TAB 3: SECURE COMMUNICATIONS (CHAT) */}
              {activeTab === "chat" && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 h-[550px]"
                >
                  <div className={`border-r pr-6 flex flex-col gap-5 ${borderCol}`}>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search messages"
                        value={chatSearchQuery}
                        onChange={(e) => setChatSearchQuery(e.target.value)}
                        className={`w-full border text-[9px] uppercase tracking-wider px-2.5 py-1.5 pl-7 outline-none rounded font-mono ${
                          isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-black/5 border-black/10 text-black"
                        }`}
                      />
                      <Search size={10} className={`absolute left-2.5 top-1/2 -translate-y-1/2 ${isDarkMode ? "text-white/40" : "text-black/40"}`} />
                    </div>

                    <div className="flex flex-col gap-2">
                      <span style={{ color: brandHighlight }} className="text-[9px] font-bold uppercase tracking-widest">Channels</span>
                      {["#general", "#engineering-sync"].map(ch => (
                        <button
                          key={ch}
                          onClick={() => {
                            setActiveChat(ch);
                            setChatSearchQuery("");
                          }}
                          className={`text-left text-xs font-mono px-3 py-1.5 rounded transition-all cursor-pointer truncate ${
                            activeChat === ch 
                              ? isDarkMode ? "bg-white text-zinc-950 font-bold" : "bg-black text-white font-bold"
                              : isDarkMode ? "hover:bg-white/5 text-white/70" : "hover:bg-black/5 text-black/70"
                          }`}
                        >
                          {ch}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2">
                      <span style={{ color: brandHighlight }} className="text-[9px] font-bold uppercase tracking-widest">Private chats</span>
                      {userDb.map(m => m.name)
                        .filter(n => n !== currentUser.name)
                        .map(n => {
                          const dmKey = getDMKey(currentUser.name, n);
                          return (
                            <button
                              key={n}
                              onClick={() => {
                                  setActiveChat(dmKey);
                                  setChatSearchQuery("");
                              }}
                              className={`text-left text-xs font-mono px-3 py-1.5 rounded transition-all cursor-pointer truncate ${
                                activeChat === dmKey 
                                  ? isDarkMode ? "bg-white text-zinc-950 font-bold" : "bg-black text-white font-bold"
                                  : isDarkMode ? "hover:bg-white/5 text-white/70" : "hover:bg-black/5 text-black/70"
                              }`}
                            >
                              {n.split(" ")[0]}
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  <div className={`flex flex-col justify-between h-full border rounded-lg overflow-hidden ${isDarkMode ? "bg-white/[0.01] border-white/10" : "bg-black/[0.01] border-black/10"}`}>
                    <div className={`border-b px-4 py-3 flex justify-between items-center ${borderCol} ${isDarkMode ? "bg-white/[0.02]" : "bg-black/[0.02]"}`}>
                      <span className="font-header font-black uppercase text-xs tracking-wider">
                        {activeChat.startsWith("dm__") 
                          ? `Private DM: ${getDMPartnerName(activeChat, currentUser.name)}`
                          : `Channel: ${activeChat}`
                        }
                      </span>
                      <span className={`text-[9px] font-mono ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
                        {filteredChatMsgs.length} messages listed
                      </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                      {filteredChatMsgs.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                          <MessageSquare className={`${isDarkMode ? "text-white/20" : "text-black/20"} mb-2`} size={32} />
                          <p className={`text-xs font-mono ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
                            {chatSearchQuery ? "No messages matching search query." : "No conversation history here yet."}
                          </p>
                        </div>
                      ) : (
                        filteredChatMsgs.map((msg) => {
                          const isOwnMessage = msg.sender === currentUser.name;
                          const isEditing = editingMessageId === msg.id;

                          return (
                            <div key={msg.id} className="group/msg flex items-start gap-3">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0 ${
                                userDb.find(t => t.name === msg.sender)?.avatarColor || "bg-gray-500"
                              }`}>
                                {msg.sender.split(" ").map(n => n[0]).join("")}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline gap-2">
                                  <span className={`text-[9px] font-bold uppercase tracking-wider ${isDarkMode ? "text-white/80" : "text-black/70"}`}>
                                    {msg.sender} <span className={`font-normal ${isDarkMode ? "text-white/40" : "text-black/45"}`}>({msg.role})</span>
                                  </span>
                                  <span className={`text-[8px] font-mono ${isDarkMode ? "text-white/40" : "text-black/35"}`}>{msg.timestamp}</span>
                                </div>

                                {isEditing ? (
                                  <div className="flex gap-2 mt-1">
                                    <input 
                                      type="text"
                                      value={editingMessageText}
                                      onChange={(e) => setEditingMessageText(e.target.value)}
                                      className="flex-grow border border-black/20 text-xs px-2 py-1 font-mono uppercase bg-white outline-none rounded text-black"
                                    />
                                    <button 
                                      onClick={() => handleEditMessage(msg.id)}
                                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-1 text-[9px] font-bold uppercase rounded cursor-pointer font-mono text-black"
                                    >
                                      Save
                                    </button>
                                    <button 
                                      onClick={() => setEditingMessageId(null)}
                                      className="bg-black/5 hover:bg-black/10 border border-black/10 px-2 py-1 text-[9px] font-bold uppercase rounded cursor-pointer font-mono text-black"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <p className={`text-xs font-mono mt-0.5 max-w-full break-words lowercase first-letter:uppercase ${
                                    msg.deleted ? isDarkMode ? "italic text-white/30" : "italic text-black/30" : isDarkMode ? "text-white/90" : "text-black/85"
                                  }`}>
                                    {msg.text}
                                    {msg.edited && <span className={`text-[8px] ml-1.5 lowercase ${isDarkMode ? "text-white/40" : "text-black/30"}`}>(edited)</span>}
                                  </p>
                                )}
                              </div>

                              {isOwnMessage && !msg.deleted && !isEditing && (
                                <div className={`opacity-0 group-hover/msg:opacity-100 flex gap-1 self-center border shadow-sm rounded p-0.5 ${isDarkMode ? "bg-[#152347] border-white/10" : "bg-white border-black/10"}`}>
                                  <button
                                    onClick={() => {
                                      setEditingMessageId(msg.id);
                                      setEditingMessageText(msg.text);
                                    }}
                                    className={`p-1 cursor-pointer ${isDarkMode ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black"}`}
                                    title="Edit message"
                                  >
                                    <Edit3 size={11} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteMessage(msg.id)}
                                    className="p-1 text-[#e31a1c] hover:text-red-700 cursor-pointer"
                                    title="Delete message"
                                  >
                                    <Trash2 size={11} />
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className={`border-t p-3 flex gap-2 ${borderCol} ${isDarkMode ? "bg-zinc-950/20" : "bg-white"}`}>
                      <input 
                        type="text" 
                        placeholder={activeChat.startsWith("dm__")
                          ? `Message ${getDMPartnerName(activeChat, currentUser.name)}...`
                          : `Message ${activeChat}...`
                        }
                        value={chatInputText}
                        onChange={(e) => setChatInputText(e.target.value)}
                        className={`flex-grow border text-xs font-mono uppercase px-3 py-2 outline-none rounded ${
                          isDarkMode ? "border-white/20 bg-white/5 text-white focus:border-white" : "border-black/20 bg-white text-black focus:border-black"
                        }`}
                      />
                      <button
                        type="submit"
                        style={{ backgroundColor: brandHighlight, color: isDarkMode ? "#000000" : "#ffffff" }}
                        className="p-2 rounded cursor-pointer flex items-center justify-center"
                      >
                        <Send size={14} />
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: GOOGLE DRIVE STORAGE LINK */}
              {activeTab === "storage" && (
                <motion.div
                  key="storage"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex flex-col gap-8 h-full"
                >
                  <div className={`border-b pb-4 ${borderCol}`}>
                    <h2 className="text-2xl font-header font-black tracking-tight uppercase">Cloud storage integration</h2>
                    <p className={`text-sm mt-1 ${isDarkMode ? "text-white/50" : "text-black/50"}`}>Link your personal storage drive to directly pull schematics, guidelines, and BOM drafts into client project boards.</p>
                  </div>

                  <div className={`border rounded-lg p-6 max-w-xl flex flex-col items-center text-center mx-auto w-full gap-6 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/[0.02] border-black/10"}`}>
                    <div className="h-16 w-16 bg-[#10b981]/10 rounded-full flex items-center justify-center text-[#10b981]">
                      <Cloud size={32} />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider">Google Drive cloud storage</h3>
                      <p className={`text-xs font-mono mt-1.5 max-w-sm lowercase first-letter:uppercase ${isDarkMode ? "text-white/60" : "text-black/60"}`}>
                        Connect your corporate shared drive to instantly link large 3D CAD step files, detailed CMF specs, and freight schedules directly to projects.
                      </p>
                    </div>

                    {!isDriveLinked ? (
                      <button
                        onClick={linkGoogleDrive}
                        disabled={isLinkingDrive}
                        className="bg-black hover:bg-black/85 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded cursor-pointer transition-all flex items-center gap-2"
                      >
                        {isLinkingDrive ? (
                          <>
                            <span className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Connecting...</span>
                          </>
                        ) : (
                          <>
                            <span>Connect Google Drive</span>
                            <ExternalLink size={12} />
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="flex flex-col items-center gap-4 w-full">
                        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs px-4 py-2.5 rounded flex items-center gap-2 font-mono">
                          <Check size={14} className="text-[#10b981]" />
                          <span>Linked successfully to ryrorussell1@gmail.com</span>
                        </div>

                        <div className={`w-full text-left border rounded-lg overflow-hidden mt-4 ${isDarkMode ? "bg-[#18294d] border-white/10" : "bg-white border-black/10"}`}>
                          <div className={`border-b px-4 py-2.5 text-[10px] font-bold uppercase ${isDarkMode ? "bg-white/5 border-white/10 text-white/50" : "bg-black/[0.02] border-black/10 text-black/50"}`}>
                            Available Drive files (click to import to project)
                          </div>
                          <div className={`divide-y text-xs font-mono ${isDarkMode ? "divide-white/10" : "divide-black/10"}`}>
                            {[
                              { name: "Product_Brand_Guidelines_2026.pdf", size: "11.2 MB" },
                              { name: "spacex_housing_tolerance.step", size: "24.5 MB" },
                              { name: "sourcing_bom_sheet_v4.xlsx", size: "1.8 MB" }
                            ].map((driveFile, idx) => (
                              <div key={idx} className="flex justify-between items-center p-3">
                                <div>
                                  <span className="font-bold uppercase block">{driveFile.name}</span>
                                  <span className={`text-[9px] ${isDarkMode ? "text-white/40" : "text-black/40"}`}>{driveFile.size}</span>
                                </div>
                                
                                <select 
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      importDriveFile(driveFile.name, e.target.value);
                                      alert(`Imported ${driveFile.name} to project successfully!`);
                                      e.target.value = "";
                                    }
                                  }}
                                  className={`text-[9px] font-bold border rounded px-2.5 py-1.5 outline-none cursor-pointer ${
                                    isDarkMode ? "bg-zinc-950/40 border-white/20 text-white" : "bg-transparent border-black/15 text-black"
                                  }`}
                                >
                                  <option value="">IMPORT TO...</option>
                                  {clients.map(c => (
                                    <optgroup key={c.id} label={c.name} className="text-black">
                                      {c.projects.map(p => (
                                        <option key={p.id} value={p.id} className="text-black">{p.name}</option>
                                      ))}
                                    </optgroup>
                                  ))}
                                </select>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setIsDriveLinked(false);
                            localStorage.setItem("sec_pm_drive_linked", "false");
                          }}
                          className={`text-[9px] font-bold uppercase cursor-pointer ${isDarkMode ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"}`}
                        >
                          Unlink Drive account
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* TAB 5: ARCHIVE VAULT */}
              {activeTab === "archive" && (
                <motion.div
                  key="archive"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex flex-col gap-6 h-full"
                >
                  <div className={`border-b pb-4 ${borderCol}`}>
                    <h2 className="text-2xl font-header font-black tracking-tight uppercase">Archive vault</h2>
                    <p className={`text-sm mt-1 ${isDarkMode ? "text-white/50" : "text-black/50"}`}>
                      Secure repository for archived client profiles and projects. Items are retained for 365 days before permanent deletion.
                    </p>
                  </div>

                  <div className={`border rounded-lg overflow-hidden ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/[0.01] border-black/10"}`}>
                    {archivedItems.length === 0 ? (
                      <div className="p-12 text-center text-xs font-mono text-black/40 flex flex-col items-center justify-center gap-2">
                        <Archive size={32} className="opacity-50 mb-2" />
                        <span>The archive vault is currently empty.</span>
                      </div>
                    ) : (
                      <table className="w-full text-left text-xs font-mono uppercase border-collapse">
                        <thead>
                          <tr className={`border-b text-[10px] ${isDarkMode ? "bg-white/5 border-white/10 text-white/50" : "bg-black/[0.02] border-black/10 text-black/55"}`}>
                            <th className="p-4 font-bold">Item name</th>
                            <th className="p-4 font-bold w-[120px]">Type</th>
                            <th className="p-4 font-bold w-[140px]">Date archived</th>
                            <th className="p-4 font-bold w-[180px]">Expiration countdown</th>
                            <th className="p-4 font-bold w-[150px] text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y ${isDarkMode ? "divide-white/10" : "divide-black/10"}`}>
                          {archivedItems.map(item => {
                            const daysLeft = getDaysRemaining(item.archivedDate);
                            return (
                              <tr key={item.id} className={isDarkMode ? "hover:bg-white/[0.01]" : "hover:bg-black/[0.01]"}>
                                <td className="p-4 font-bold">
                                  {item.type === "project" ? (
                                    <div>
                                      <span className="font-header font-black tracking-wide text-xs">{item.name}</span>
                                      <span className={`block text-[9px] font-normal mt-0.5 ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
                                        Original client: {item.originalClientName}
                                      </span>
                                    </div>
                                  ) : (
                                    <span style={{ color: brandHighlight }} className="font-header font-black tracking-widest text-xs">
                                      {item.name}
                                    </span>
                                  )}
                                </td>
                                <td className="p-4 text-[10px] font-bold text-black/60">
                                  {item.type}
                                </td>
                                <td className="p-4 text-[10px]">
                                  {item.archivedDate.split("T")[0]}
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-full bg-black/10 rounded-full h-1.5 dark:bg-white/10 max-w-[100px]">
                                      <div 
                                        className="bg-amber-500 h-1.5 rounded-full" 
                                        style={{ width: `${(daysLeft / 365) * 100}%` }}
                                      />
                                    </div>
                                    <span className="text-[10px] font-bold">{daysLeft} days remaining</span>
                                  </div>
                                </td>
                                <td className="p-4 text-right">
                                  <div className="flex justify-end gap-1.5">
                                    <button
                                      onClick={() => handleRestoreItem(item)}
                                      className={`p-1.5 border rounded cursor-pointer flex items-center justify-center ${isDarkMode ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"}`}
                                      title="Restore to active board"
                                    >
                                      <RotateCcw size={12} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteArchivedItem(item.id)}
                                      className={`p-1.5 border rounded cursor-pointer flex items-center justify-center text-[#e31a1c] ${isDarkMode ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"}`}
                                      title="Delete permanently"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* FILE PREVIEW MODAL */}
      <AnimatePresence>
        {previewFile && (() => {
          // Calculate current target file data (swaps to past version if selected)
          let activeTarget = previewFile;
          if (selectedVersionId !== "active" && previewFile.versions) {
            const foundVer = previewFile.versions.find(
              (v: any) => String(v.versionId) === selectedVersionId
            );
            if (foundVer) activeTarget = foundVer;
          }

          const extension = activeTarget.name.substring(activeTarget.name.lastIndexOf('.')).toLowerCase();
          const isCAD = [".step", ".stp", ".3dm"].includes(extension);
          const isCMF = extension === ".cmf";
          const isPDF = extension === ".pdf";
          const isExcel = [".xlsx", ".csv"].includes(extension);

          const hasRealData = activeTarget.isRealUpload && (activeTarget.url || activeTarget.content);

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
            >
              <motion.div
                initial={{ scale: 0.96, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 15 }}
                className={`w-[96vw] h-[92vh] max-w-7xl border rounded-xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${cardBg} ${borderCol}`}
              >
                {/* Modal Header with Navigation & Version Control selector */}
                <div className={`p-4 border-b flex justify-between items-center ${borderCol}`}>
                  <div>
                    <h3 className="font-header font-black text-sm tracking-wide text-foreground uppercase truncate max-w-[250px] sm:max-w-md" title={activeTarget.name}>
                      {activeTarget.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className={`text-[9px] font-mono uppercase ${isDarkMode ? "text-white/40" : "text-black/45"}`}>
                        Size: {activeTarget.size} &bull; Uploaded by {activeTarget.uploadedBy} on {activeTarget.date}
                      </p>
                      
                      {/* Version selector dropdown */}
                      {previewFile.versions && previewFile.versions.length > 0 && (
                        <div className="flex items-center gap-1 ml-2">
                          <History size={10} className={isDarkMode ? "text-white/40" : "text-black/40"} />
                          <select
                            value={selectedVersionId}
                            onChange={(e) => setSelectedVersionId(e.target.value)}
                            className={`text-[8px] font-mono uppercase border rounded px-1.5 py-0.5 outline-none cursor-pointer ${
                              isDarkMode ? "bg-[#12203f] border-white/20 text-white" : "bg-white border-black/15 text-black"
                            }`}
                          >
                            <option value="active">v{previewFile.versions.length + 1} (active)</option>
                            {previewFile.versions.map((ver: any) => (
                              <option key={ver.versionId} value={String(ver.versionId)}>
                                v{ver.versionId} ({ver.date})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Navigation & Close */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleNavigateFile("prev")}
                        className={`px-3 py-1.5 border rounded text-[10px] font-bold uppercase transition-all cursor-pointer flex items-center gap-1 ${
                          isDarkMode ? "border-white/10 hover:bg-white/5 text-white" : "border-black/10 hover:bg-black/5 text-black"
                        }`}
                      >
                        ← Prev
                      </button>
                      <button
                        onClick={() => handleNavigateFile("next")}
                        className={`px-3 py-1.5 border rounded text-[10px] font-bold uppercase transition-all cursor-pointer flex items-center gap-1 ${
                          isDarkMode ? "border-white/10 hover:bg-white/5 text-white" : "border-black/10 hover:bg-black/5 text-black"
                        }`}
                      >
                        Next →
                      </button>
                    </div>

                    <button
                      onClick={() => setPreviewFile(null)}
                      style={{ color: brandHighlight }}
                      className="font-bold cursor-pointer text-xs uppercase px-3 py-1.5 border border-current rounded hover:opacity-75 transition-all"
                    >
                      ✕ Close
                    </button>
                  </div>
                </div>

                {/* Modal Content Viewport */}
                <div className="flex-grow overflow-auto p-6 flex flex-col justify-center items-center font-mono w-full h-full min-h-0 relative">
                  
                  {hasRealData ? (
                    <div className="w-full h-full flex flex-col justify-center items-center min-h-0">
                      {activeTarget.isGoogleDrive && activeTarget.previewUrl ? (
                        <iframe 
                          src={activeTarget.previewUrl} 
                          className="w-full h-full border border-black/10 rounded-lg" 
                          title={activeTarget.name}
                          allow="autoplay"
                        />
                      ) : isPDF && activeTarget.url ? (
                        <iframe 
                          src={activeTarget.url} 
                          className="w-full h-full border border-black/10 rounded-lg" 
                          title={activeTarget.name}
                        />
                      ) : activeTarget.url && !isPDF && !isTextOrCADCode(extension) ? (
                        <img 
                          src={activeTarget.url} 
                          alt={activeTarget.name} 
                          className="max-w-full max-h-full object-contain rounded-lg border shadow-sm"
                        />
                      ) : null}

                      {isExcel && activeTarget.content && (
                        <div className="w-full h-full overflow-auto">
                          <table className={`w-full text-left uppercase border border-collapse text-[10px] ${borderCol}`}>
                            <tbody>
                              {activeTarget.content.split("\n").map((line: string, lIdx: number) => {
                                const cols = line.split(",");
                                const isHeader = lIdx === 0;
                                return (
                                  <tr key={lIdx} className={isHeader ? isDarkMode ? "bg-white/10" : "bg-black/5" : ""}>
                                    {cols.map((col: string, cIdx: number) => (
                                      <td 
                                        key={cIdx} 
                                        className={`p-2.5 border border-current ${isHeader ? "font-bold" : ""}`}
                                      >
                                        {col}
                                      </td>
                                    ))}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {(!isPDF && !isExcel && !activeTarget.url) || (isCAD && activeTarget.content) ? (
                        <div className="w-full h-full flex flex-col min-h-0">
                          {isCAD && (
                            <div className="flex justify-center mb-4">
                              <motion.svg 
                                viewBox="0 0 100 100" 
                                className="w-28 h-28 drop-shadow-md text-current"
                                animate={{ rotateY: 360, rotateX: 360 }}
                                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                              >
                                <rect x="35" y="35" width="45" height="45" fill="none" stroke={brandHighlight} strokeWidth="1.5" />
                                <line x1="20" y1="20" x2="35" y2="35" stroke={brandHighlight} strokeWidth="1" />
                                <line x1="80" y1="20" x2="80" y2="35" stroke={brandHighlight} strokeWidth="1" />
                                <line x1="20" y1="80" x2="35" y2="80" stroke={brandHighlight} strokeWidth="1" />
                              </motion.svg>
                            </div>
                          )}
                          <pre className="w-full flex-grow text-left p-4 bg-zinc-950 text-emerald-400 rounded-lg overflow-auto text-xs leading-relaxed">
                            {activeTarget.content}
                          </pre>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    /* FALLBACK STATIC MOCK PREVIEWS FOR PRE-POPULATED DEMO FILES */
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      {isCAD && (
                        <div className="flex flex-col items-center gap-6 w-full justify-center h-full">
                          <div className="relative w-80 h-80 flex items-center justify-center">
                            <div className="absolute inset-0 border border-dashed rounded-full animate-[spin_30s_linear_infinite] opacity-15 border-current" />
                            <div className="absolute inset-4 border border-dashed rounded-full animate-[spin_20s_linear_infinite_reverse] opacity-25 border-current" />
                            
                            <motion.svg 
                              viewBox="0 0 100 100" 
                              className="w-56 h-56 drop-shadow-lg"
                              animate={{ rotateY: 360, rotateX: 360 }}
                              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                            >
                              <defs>
                                <linearGradient id="cubeGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor={brandHighlight} stopOpacity="0.8" />
                                  <stop offset="100%" stopColor={brandHighlight} stopOpacity="0.2" />
                                </linearGradient>
                              </defs>
                              <line x1="20" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2" opacity="0.4" />
                              <line x1="20" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2" opacity="0.4" />
                              <line x1="80" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2" opacity="0.4" />
                              <rect x="35" y="35" width="45" height="45" fill="url(#cubeGrad3)" stroke={brandHighlight} strokeWidth="1.5" />
                              <line x1="20" y1="20" x2="35" y2="35" stroke={brandHighlight} strokeWidth="1" />
                              <line x1="80" y1="20" x2="80" y2="35" stroke={brandHighlight} strokeWidth="1" />
                              <line x1="20" y1="80" x2="35" y2="80" stroke={brandHighlight} strokeWidth="1" />
                            </motion.svg>
                          </div>
                          <div className="text-center font-mono text-[10px] uppercase tracking-widest leading-relaxed">
                            <span className="font-bold block text-[#10b981]">3D CAD Viewport Connected</span>
                            <span className="opacity-55">Tolerances: Standard ISO 2768-m &bull; Render: Wireframe Mesh</span>
                          </div>
                        </div>
                      )}

                      {isCMF && (
                        <div className="w-full max-w-2xl flex flex-col gap-6 font-mono uppercase h-full justify-center">
                          <h4 className="text-sm font-bold text-center border-b pb-3 border-current">Color Material Finish Specification</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className={`p-5 border rounded-lg ${borderCol} flex gap-4 items-center ${isDarkMode ? "bg-white/5" : "bg-black/[0.02]"}`}>
                              <div className="h-20 w-20 bg-[#e4d8c6] border border-black/10 rounded-lg" />
                              <div>
                                <span className="text-[11px] font-bold block text-[#fbbf24] dark:text-yellow-400">Beige Anodize</span>
                                <span className="text-[9px] block opacity-50 mt-1">Ref: Pantone 7530C</span>
                                <span className="text-[9px] block opacity-50">Substrate: Aluminum 6061-T6</span>
                              </div>
                            </div>
                            <div className={`p-5 border rounded-lg ${borderCol} flex gap-4 items-center ${isDarkMode ? "bg-white/5" : "bg-black/[0.02]"}`}>
                              <div className="h-20 w-20 bg-zinc-800 border border-black/10 rounded-lg" />
                              <div>
                                <span className="text-[11px] font-bold block text-[#fbbf24] dark:text-yellow-400">Matte Obsidian</span>
                                <span className="text-[9px] block opacity-50 mt-1">Ref: Matte Black anodized</span>
                                <span className="text-[9px] block opacity-50">Texture: Sandblast 120 Grit</span>
                              </div>
                            </div>
                          </div>
                          <div className={`p-4 border rounded text-[10px] leading-relaxed ${borderCol}`}>
                            <strong>Quality benchmark standards:</strong> Glossiness 3% at 60 degrees. Adherence testing tape peel class 4B. Thickness target 12 microns anodized shell layer.
                          </div>
                        </div>
                      )}

                      {isPDF && (
                        <div className="w-full h-full max-w-3xl text-left bg-white text-zinc-950 p-10 rounded-lg shadow-xl border border-black/10 font-sans leading-relaxed overflow-y-auto lowercase first-letter:uppercase">
                          <div className="border-b-2 border-zinc-900 pb-4 mb-6 font-mono uppercase">
                            <h4 className="text-xl font-black tracking-tight">Corporate engineering specification</h4>
                            <span className="text-[10px] text-zinc-500">Doc ID: SPEC-2026-STARSHIELD-04</span>
                          </div>
                          
                          <div className="space-y-6 text-xs text-zinc-800 font-medium">
                            <p className="font-bold text-sm uppercase text-zinc-950">1. Project scope</p>
                            <p>This specification dictates structural requirements and dimensions for Starshield communications enclosures. Material is certified space-grade anodized aluminum.</p>
                            
                            <p className="font-bold text-sm uppercase text-zinc-950">2. Environmental tolerances</p>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                              <li>Operating temperature: -120C to +150C.</li>
                              <li>IP Rating: Fully IP68 certified dust and water ingress protection.</li>
                              <li>Ingress seal: Dual-ring silicone rubber custom compression gaskets.</li>
                            </ul>
                            
                            <p className="font-bold text-sm uppercase text-zinc-950">3. Verification protocols</p>
                            <p>All finished parts undergo coordinate measuring machine inspection to verify tight tolerance thresholds down to +/- 0.05 millimeters.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* MOSAIC BENTO BOX PREVIEW MODAL */}
      <AnimatePresence>
        {mosaicClientId && (() => {
          const client = clients.find(c => c.id === mosaicClientId);
          if (!client) return null;

          const files = getClientFilesList(mosaicClientId);

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
            >
              <motion.div
                initial={{ scale: 0.96, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 15 }}
                className={`w-[96vw] h-[92vh] max-w-7xl border rounded-xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${cardBg} ${borderCol}`}
              >
                <div className={`p-4 border-b flex justify-between items-center ${borderCol}`}>
                  <div>
                    <h3 className="font-header font-black text-sm tracking-wide text-foreground uppercase">
                      Mosaic Board: {client.name} files
                    </h3>
                    <p className={`text-[9px] font-mono mt-0.5 uppercase ${isDarkMode ? "text-white/40" : "text-black/45"}`}>
                      Displaying {files.length} active project deliverables in bento grid
                    </p>
                  </div>

                  <button
                    onClick={() => setMosaicClientId(null)}
                    style={{ color: brandHighlight }}
                    className="font-bold cursor-pointer text-xs uppercase px-3 py-1.5 border border-current rounded hover:opacity-75 transition-all"
                  >
                    ✕ Close
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto p-6 min-h-0 bg-black/[0.02] dark:bg-white/[0.01]">
                  {files.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                      <Folder className="text-black/20 dark:text-white/20 mb-2" size={32} />
                      <p className="text-xs font-mono text-black/40 dark:text-white/40 uppercase">No files found for this client section.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
                      {files.map((file, fIdx) => {
                        const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                        const isCAD = [".step", ".stp", ".3dm"].includes(extension);
                        const isCMF = extension === ".cmf";
                        const isPDF = extension === ".pdf";
                        const isExcel = [".xlsx", ".csv"].includes(extension);
                        const hasRealData = file.isRealUpload && (file.url || file.content);

                        return (
                          <div
                            key={fIdx}
                            onClick={() => {
                              setPreviewFile(file);
                              setMosaicClientId(null);
                            }}
                            className={`border rounded-xl p-4 flex flex-col gap-3 cursor-pointer shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300 ${cardBg} ${borderCol}`}
                          >
                            <div className="flex justify-between items-start border-b border-black/[0.05] dark:border-white/[0.05] pb-2 shrink-0">
                              <div className="min-w-0">
                                <span className="font-header font-black tracking-wide text-xs block truncate pr-1" title={file.name}>
                                  {file.name}
                                </span>
                                <span className={`text-[8px] font-mono uppercase opacity-50 block mt-0.5`}>
                                  {file.size} &bull; {file.date}
                                </span>
                              </div>
                              <Eye size={12} className="shrink-0 opacity-40 group-hover:opacity-100" />
                            </div>

                            <div className="flex-grow flex items-center justify-center overflow-hidden w-full relative min-h-0 bg-black/[0.01] dark:bg-white/[0.01] rounded border border-black/[0.02] dark:border-white/[0.02]">
                              
                              {hasRealData ? (
                                <div className="w-full h-full flex justify-center items-center scale-90">
                                  {file.isGoogleDrive ? (
                                    <div className="w-full h-full flex flex-col justify-center items-center text-[9px] opacity-60 uppercase text-center font-bold">
                                      <Briefcase size={22} className="mb-1 text-blue-500" />
                                      <span>Google Drive Link</span>
                                      <span className="text-[7px] opacity-50 mt-0.5">Click to Preview</span>
                                    </div>
                                  ) : isPDF && file.url ? (
                                    <div className="w-full h-full flex flex-col justify-center items-center text-[8px] opacity-40 uppercase">
                                      <Paperclip size={24} className="mb-1" />
                                      <span>Click to view PDF</span>
                                    </div>
                                  ) : file.url && !isPDF && !isTextOrCADCode(extension) ? (
                                    <img src={file.url} alt="" className="max-w-full max-h-full object-contain rounded" />
                                  ) : null}
                                  {isExcel && file.content && (
                                    <div className="text-[7px] text-left overflow-hidden opacity-50 select-none">
                                      {file.content.substring(0, 100)}...
                                    </div>
                                  )}
                                  {isCAD && file.content && (
                                    <div className="flex flex-col items-center">
                                      <motion.svg viewBox="0 0 100 100" className="w-12 h-12" animate={{ rotateY: 360 }}>
                                        <rect x="35" y="35" width="45" height="45" fill="none" stroke={brandHighlight} strokeWidth="1.5" />
                                      </motion.svg>
                                    </div>
                                  )}
                                  {!isPDF && !isExcel && !isCAD && !file.url && file.content && (
                                    <div className="text-[7px] text-left opacity-40 overflow-hidden leading-tight font-mono w-full">
                                      {file.content.substring(0, 120)}...
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="w-full h-full flex justify-center items-center scale-90">
                                  {isCAD && (
                                    <div className="flex flex-col items-center">
                                      <motion.svg 
                                        viewBox="0 0 100 100" 
                                        className="w-16 h-16 opacity-75"
                                        animate={{ rotateY: 360 }}
                                        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                                      >
                                        <rect x="35" y="35" width="45" height="45" fill="none" stroke={brandHighlight} strokeWidth="1.5" />
                                      </motion.svg>
                                      <span className="text-[8px] opacity-40 mt-1 uppercase">3D Wireframe</span>
                                    </div>
                                  )}

                                  {isCMF && (
                                    <div className="flex gap-2 justify-center items-center">
                                      <div className="h-8 w-8 bg-[#e4d8c6] rounded" />
                                      <div className="h-8 w-8 bg-zinc-800 rounded" />
                                      <span className="text-[8px] opacity-40 uppercase">CMF Swatches</span>
                                    </div>
                                  )}

                                  {isPDF && (
                                    <div className="flex flex-col items-center opacity-40 text-[8px] uppercase">
                                      <Briefcase size={20} className="mb-1" />
                                      <span>Engineering specs</span>
                                    </div>
                                  )}
                                </div>
                              )}

                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </main>
  );
}

// Check helper
function isTextOrCADCode(ext: string) {
  return [".txt", ".md", ".json", ".csv", ".cmf", ".step", ".stp"].includes(ext);
}
