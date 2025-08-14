// ====== Common ======
type UUID = string;
type Timestamp = string; // ISO date

// ====== Users & Profiles ======
interface User {
  id: UUID;
  email: string;
  password: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}

interface Profile {
  id: number;
  user_id: UUID; // FK -> users.id
  first_name: string;
  last_name: string;
  avatar_url: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  email: string;
  phone: string;
  account_type: "member" | "individual" | "company_owner";
  country: string;
  city: string;
  company_id: UUID | null; // FK -> companies.id
  created_at: Timestamp;
  updated_at: Timestamp;
}

// ====== Companies ======
interface Company {
  id: UUID;
  name: string;
  industry: string;
  location: string;
  size: number;
  website: string;
  founded: number;
  created_at: Timestamp;
  updated_at: Timestamp;
}

// ====== Members ======
interface Member {
  id: number;
  user_id: UUID; // FK -> users.id
  role: "Admin" | "Manager" | "Member";
  level: "Junior" | "Mid" | "Senior";
  position: string;
  company_id: UUID; // FK -> companies.id
  created_at: Timestamp;
  updated_at: Timestamp;
}

// ====== Events ======
interface EEvent {
  id: number;
  title: string;
  description: string;
  company_id: UUID;
  created_by: UUID;
  date: string;
  time: string;
  duration: number;
  location: string;

  event_type:
    | "meeting"
    | "presentation"
    | "workshop"
    | "deadline"
    | "birthday"
    | "anniversary"
    | "movie"
    | "product_launch"
    | "conference";
  visibility: "private" | "company_only";
  created_at: Timestamp;
  updated_at: Timestamp;
}

// Event Participants (Many-to-Many)
interface EventParticipant {
  id: number;
  event_id: number; // FK -> events.id
  member_id: number; // FK -> members.id
  status: "invited" | "attending" | "declined";
  joined_at: Timestamp;
}

// ====== Activities ======
interface Activity {
  id: number;
  company_id: UUID; // FK -> companies.id
  user_id: UUID; // FK -> users.id
  target_type: "project" | "task" | "event" | "company";
  target_id: number | UUID;
  message: string;
  type: "add" | "attach" | "edit" | "remove" | "comment" | "finish" | "invite";
  created_at: Timestamp;
}

// ====== Projects ======
interface Project {
  id: number;
  name: string;
  code: string;
  description: string;
  owner_id: UUID; // FK -> users.id
  company_id: UUID; // FK -> companies.id
  start_date: Timestamp;
  end_date: Timestamp;
  deadline: Timestamp;
  budget?: number;
  currency?: string;
  priority: "low" | "medium" | "high";
  status: "planned" | "active" | "completed" | "archived";
  image_url: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}
// Project Members (Many-to-Many)
interface ProjectMember {
  id: number;
  project_id: number; // FK -> projects.id
  member_id: number; // FK -> members.id
  joined_at: Timestamp;
}

// ====== Stages ======
interface Stage {
  id: number;
  project_id: number; // FK -> projects.id
  name: string;
  description: string;
  order: number;
  start_date: string;
  end_date: string;
  status: "planned" | "in_progress" | "completed" | "archived";
  created_at: Timestamp;
  updated_at: Timestamp;
}

// ====== Tasks ======
interface Task {
  id: number;
  stage_id: number; // FK -> stages.id
  group: string;
  reporter_id: UUID; // FK -> users.id
  name: string;
  description: string;
  assignee_id: UUID; // FK -> users.id
  create_by_id: UUID; // FK -> users.id
  estimated_time: number; // minutes
  spent_time: number; // minutes
  due_date: string;
  priority: "low" | "medium" | "high";
  status: "to_do" | "in_progress" | "completed" | "backlog" | "review";
  progress?: number; // 0–100 %
  created_at: Timestamp;
  updated_at: Timestamp;
}

// ====== Task Comments ======
interface TaskComment {
  id: number;
  task_id: number; // FK -> tasks.id
  user_id: UUID; // FK -> users.id
  content: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}

// ====== Attachments ======
interface Attachment {
  id: number;
  target_type: "project" | "task" | "event";
  target_id: number;
  file_url: string;
  uploaded_by: UUID; // FK -> users.id
  created_at: Timestamp;
}
interface Vacation {
  id: number;
  member_id: number; // FK -> members.id
  start_date: Timestamp; // YYYY-MM-DD
  start_hour?: string; // "HH:mm"
  end_date: Timestamp; // YYYY-MM-DD
  end_hour?: string; // "HH:mm"
  type: "annual" | "sick" | "remotly";
  status: "pending" | "approved" | "rejected";
  reason?: string;
  approved_by?: UUID; // FK -> users.id
  created_at: Timestamp; // ISO date
  updated_at: Timestamp; // ISO date
}

// ====== Task Requests ======
interface TaskRequest {
  id: number;
  task_id: number; // FK -> tasks.id
  member_id: number; // FK -> members.id
  status: "pending" | "accepted" | "rejected"; // حالة الطلب
  comment?: string; // تعليق العضو عند الرفض أو قبول
  requested_by: UUID; // FK -> users.id
  requested_at: Timestamp;
  responded_at?: Timestamp; // وقت الموافقة أو الرفض
}
interface Notification {
  id: number;
  user_id: UUID;
  type: "task" | "project" | "event" | "vacation" | "system";
  target_type: "task" | "project" | "event" | "vacation";
  target_id: number | UUID;
  message: string;
  read: boolean;
  created_at: Timestamp;
}
interface AuditLog {
  id: number;
  user_id: UUID;
  action: string; // add/edit/remove/approve/reject/etc
  target_type: "task" | "project" | "event" | "vacation" | "company" | "member";
  target_id: number | UUID;
  changes?: string; // JSON أو أي تفاصيل إضافية
  created_at: Timestamp;
}
interface TaskAssignmentHistory {
  id: number;
  task_id: number;
  previous_assignee_id: UUID;
  new_assignee_id: UUID;
  changed_at: Timestamp;
}
interface Attachment {
  id: number;
  target_type: "project" | "task" | "event";
  target_id: number;
  file_url: string;
  uploaded_by: UUID;
  created_at: Timestamp;
  version?: number;
}

interface VacationHistory {
  id: number;
  member_id: number;
  vacation_id: number;
  days_deducted: number;
  remaining_vacations: number;
  updated_at: Timestamp;
}
interface WorkLog {
  id: number;
  task_id: number;
  member_id: number;
  date: Timestamp;
  hours: number;
  overtime_hours?: number;
  comment?: string;
}

// ====== Companies ======
const companies: Company[] = [
  {
    id: "company-uuid-1",
    name: "TechStars Ltd",
    industry: "Software",
    location: "Cairo, Egypt",
    size: 50,
    website: "https://techstars.example.com",
    founded: 2015,
    created_at: "2025-01-01T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
];

// ====== Users ======
const users: User[] = [
  {
    id: "user-uuid-1",
    email: "owner@techstars.com",
    password: "hashed_password_1",
    created_at: "2025-01-01T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: "user-uuid-2",
    email: "member1@techstars.com",
    password: "hashed_password_2",
    created_at: "2025-01-02T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: "user-uuid-3",
    email: "member2@techstars.com",
    password: "hashed_password_3",
    created_at: "2025-01-03T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: "user-uuid-4",
    email: "member3@techstars.com",
    password: "hashed_password_4",
    created_at: "2025-01-04T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: "user-uuid-5",
    email: "member4@techstars.com",
    password: "hashed_password_5",
    created_at: "2025-01-05T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: "user-uuid-6",
    email: "member5@techstars.com",
    password: "hashed_password_6",
    created_at: "2025-01-06T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: "user-uuid-7",
    email: "member6@techstars.com",
    password: "hashed_password_7",
    created_at: "2025-01-07T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: "user-uuid-8",
    email: "member7@techstars.com",
    password: "hashed_password_8",
    created_at: "2025-01-08T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
];

// ====== Profiles ======
const profiles: Profile[] = [
  {
    id: 1,
    user_id: "user-uuid-1",
    first_name: "Omar",
    last_name: "Hassan",
    avatar_url: "https://randomuser.me/api/portraits/men/1.jpg",
    age: 35,
    gender: "Male",
    email: "owner@techstars.com",
    phone: "+201234567890",
    account_type: "company_owner",
    country: "Egypt",
    city: "Cairo",
    company_id: "company-uuid-1",
    created_at: "2025-01-01T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  // Members
  {
    id: 2,
    user_id: "user-uuid-2",
    first_name: "Sara",
    last_name: "Ali",
    avatar_url: "https://randomuser.me/api/portraits/women/2.jpg",
    age: 28,
    gender: "Female",
    email: "member1@techstars.com",
    phone: "+201234567891",
    account_type: "member",
    country: "Egypt",
    city: "Cairo",
    company_id: "company-uuid-1",
    created_at: "2025-01-02T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: 3,
    user_id: "user-uuid-3",
    first_name: "Ali",
    last_name: "Mohamed",
    avatar_url: "https://randomuser.me/api/portraits/men/3.jpg",
    age: 30,
    gender: "Male",
    email: "member2@techstars.com",
    phone: "+201234567892",
    account_type: "member",
    country: "Egypt",
    city: "Cairo",
    company_id: "company-uuid-1",
    created_at: "2025-01-03T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: 4,
    user_id: "user-uuid-4",
    first_name: "Laila",
    last_name: "Hany",
    avatar_url: "https://randomuser.me/api/portraits/women/4.jpg",
    age: 27,
    gender: "Female",
    email: "member3@techstars.com",
    phone: "+201234567893",
    account_type: "member",
    country: "Egypt",
    city: "Cairo",
    company_id: "company-uuid-1",
    created_at: "2025-01-04T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: 5,
    user_id: "user-uuid-5",
    first_name: "Omar",
    last_name: "Samir",
    avatar_url: "https://randomuser.me/api/portraits/men/5.jpg",
    age: 29,
    gender: "Male",
    email: "member4@techstars.com",
    phone: "+201234567894",
    account_type: "member",
    country: "Egypt",
    city: "Cairo",
    company_id: "company-uuid-1",
    created_at: "2025-01-05T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: 6,
    user_id: "user-uuid-6",
    first_name: "Mona",
    last_name: "Khaled",
    avatar_url: "https://randomuser.me/api/portraits/women/6.jpg",
    age: 26,
    gender: "Female",
    email: "member5@techstars.com",
    phone: "+201234567895",
    account_type: "member",
    country: "Egypt",
    city: "Cairo",
    company_id: "company-uuid-1",
    created_at: "2025-01-06T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: 7,
    user_id: "user-uuid-7",
    first_name: "Tamer",
    last_name: "Nabil",
    avatar_url: "https://randomuser.me/api/portraits/men/7.jpg",
    age: 31,
    gender: "Male",
    email: "member6@techstars.com",
    phone: "+201234567896",
    account_type: "member",
    country: "Egypt",
    city: "Cairo",
    company_id: "company-uuid-1",
    created_at: "2025-01-07T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: 8,
    user_id: "user-uuid-8",
    first_name: "Nour",
    last_name: "Youssef",
    avatar_url: "https://randomuser.me/api/portraits/women/8.jpg",
    age: 25,
    gender: "Female",
    email: "member7@techstars.com",
    phone: "+201234567897",
    account_type: "member",
    country: "Egypt",
    city: "Cairo",
    company_id: "company-uuid-1",
    created_at: "2025-01-08T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
];

// ====== Members ======
const members: Member[] = [
  {
    id: 1,
    user_id: "user-uuid-1",
    role: "Admin",
    level: "Senior",
    position: "CEO",
    company_id: "company-uuid-1",
    created_at: "2025-01-01T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: 2,
    user_id: "user-uuid-2",
    role: "Manager",
    level: "Senior",
    position: "Project Manager",
    company_id: "company-uuid-1",
    created_at: "2025-01-02T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: 3,
    user_id: "user-uuid-3",
    role: "Member",
    level: "Mid",
    position: "Developer",
    company_id: "company-uuid-1",
    created_at: "2025-01-03T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: 4,
    user_id: "user-uuid-4",
    role: "Member",
    level: "Junior",
    position: "Designer",
    company_id: "company-uuid-1",
    created_at: "2025-01-04T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: 5,
    user_id: "user-uuid-5",
    role: "Member",
    level: "Mid",
    position: "QA Engineer",
    company_id: "company-uuid-1",
    created_at: "2025-01-05T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: 6,
    user_id: "user-uuid-6",
    role: "Member",
    level: "Junior",
    position: "Frontend Dev",
    company_id: "company-uuid-1",
    created_at: "2025-01-06T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: 7,
    user_id: "user-uuid-7",
    role: "Member",
    level: "Senior",
    position: "Backend Dev",
    company_id: "company-uuid-1",
    created_at: "2025-01-07T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
  {
    id: 8,
    user_id: "user-uuid-8",
    role: "Member",
    level: "Mid",
    position: "UI/UX",
    company_id: "company-uuid-1",
    created_at: "2025-01-08T08:00:00Z",
    updated_at: "2025-08-14T08:00:00Z",
  },
];

// ====== Activities (cover all types) ======


const activities: Activity[] = [
  // ===== TASK =====
  {
    id: 1,
    company_id: "company-uuid-1",
    user_id: "user-uuid-1",
    target_type: "task",
    target_id: 101,
    message: "", // الرسالة تتولد ديناميكياً
    type: "add",
    created_at: "2025-08-01T08:00:00Z",
  },
  {
    id: 2,
    company_id: "company-uuid-1",
    user_id: "user-uuid-2",
    target_type: "task",
    target_id: 102,
    message: "",
    type: "edit",
    created_at: "2025-08-02T09:00:00Z",
  },
  {
    id: 3,
    company_id: "company-uuid-1",
    user_id: "user-uuid-3",
    target_type: "task",
    target_id: 103,
    message: "",
    type: "attach",
    created_at: "2025-08-03T10:00:00Z",
  },
  {
    id: 4,
    company_id: "company-uuid-1",
    user_id: "user-uuid-4",
    target_type: "task",
    target_id: 104,
    message: "",
    type: "comment",
    created_at: "2025-08-04T11:00:00Z",
  },
  {
    id: 5,
    company_id: "company-uuid-1",
    user_id: "user-uuid-5",
    target_type: "task",
    target_id: 105,
    message: "",
    type: "finish",
    created_at: "2025-08-05T12:00:00Z",
  },
  {
    id: 6,
    company_id: "company-uuid-1",
    user_id: "user-uuid-6",
    target_type: "task",
    target_id: 106,
    message: "",
    type: "invite",
    created_at: "2025-08-06T13:00:00Z",
  },
  {
    id: 7,
    company_id: "company-uuid-1",
    user_id: "user-uuid-7",
    target_type: "task",
    target_id: 107,
    message: "",
    type: "remove",
    created_at: "2025-08-07T14:00:00Z",
  },

  // ===== PROJECT =====
  {
    id: 8,
    company_id: "company-uuid-1",
    user_id: "user-uuid-8",
    target_type: "project",
    target_id: 201,
    message: "",
    type: "add",
    created_at: "2025-08-08T08:00:00Z",
  },
  {
    id: 9,
    company_id: "company-uuid-1",
    user_id: "user-uuid-9",
    target_type: "project",
    target_id: 202,
    message: "",
    type: "edit",
    created_at: "2025-08-09T09:00:00Z",
  },
  {
    id: 10,
    company_id: "company-uuid-1",
    user_id: "user-uuid-10",
    target_type: "project",
    target_id: 203,
    message: "",
    type: "attach",
    created_at: "2025-08-10T10:00:00Z",
  },
  {
    id: 11,
    company_id: "company-uuid-1",
    user_id: "user-uuid-11",
    target_type: "project",
    target_id: 204,
    message: "",
    type: "comment",
    created_at: "2025-08-11T11:00:00Z",
  },
  {
    id: 12,
    company_id: "company-uuid-1",
    user_id: "user-uuid-12",
    target_type: "project",
    target_id: 205,
    message: "",
    type: "remove",
    created_at: "2025-08-12T12:00:00Z",
  },

  // ===== EVENT =====
  {
    id: 13,
    company_id: "company-uuid-1",
    user_id: "user-uuid-13",
    target_type: "event",
    target_id: 301,
    message: "",
    type: "add",
    created_at: "2025-08-13T08:00:00Z",
  },
  {
    id: 14,
    company_id: "company-uuid-1",
    user_id: "user-uuid-14",
    target_type: "event",
    target_id: 302,
    message: "",
    type: "edit",
    created_at: "2025-08-14T09:00:00Z",
  },
  {
    id: 15,
    company_id: "company-uuid-1",
    user_id: "user-uuid-15",
    target_type: "event",
    target_id: 303,
    message: "",
    type: "invite",
    created_at: "2025-08-15T10:00:00Z",
  },
  {
    id: 16,
    company_id: "company-uuid-1",
    user_id: "user-uuid-16",
    target_type: "event",
    target_id: 304,
    message: "",
    type: "attach",
    created_at: "2025-08-16T11:00:00Z",
  },
  {
    id: 17,
    company_id: "company-uuid-1",
    user_id: "user-uuid-17",
    target_type: "event",
    target_id: 305,
    message: "",
    type: "comment",
    created_at: "2025-08-17T12:00:00Z",
  },
  {
    id: 18,
    company_id: "company-uuid-1",
    user_id: "user-uuid-18",
    target_type: "event",
    target_id: 306,
    message: "",
    type: "remove",
    created_at: "2025-08-18T13:00:00Z",
  },

  // ===== COMPANY =====
  {
    id: 19,
    company_id: "company-uuid-1",
    user_id: "user-uuid-19",
    target_type: "company",
    target_id: "company-uuid-1",
    message: "",
    type: "add",
    created_at: "2025-08-19T08:00:00Z",
  },
  {
    id: 20,
    company_id: "company-uuid-1",
    user_id: "user-uuid-20",
    target_type: "company",
    target_id: "company-uuid-1",
    message: "",
    type: "edit",
    created_at: "2025-08-20T09:00:00Z",
  },
  {
    id: 21,
    company_id: "company-uuid-1",
    user_id: "user-uuid-1",
    target_type: "company",
    target_id: "company-uuid-1",
    message: "",
    type: "attach",
    created_at: "2025-08-21T10:00:00Z",
  },
  {
    id: 22,
    company_id: "company-uuid-1",
    user_id: "user-uuid-2",
    target_type: "company",
    target_id: "company-uuid-1",
    message: "",
    type: "comment",
    created_at: "2025-08-22T11:00:00Z",
  },
  {
    id: 23,
    company_id: "company-uuid-1",
    user_id: "user-uuid-1",
    target_type: "company",
    target_id: "company-uuid-1",
    message: "",
    type: "remove",
    created_at: "2025-08-23T12:00:00Z",
  },
];

// ====== Events ======

// ====== Event Participants ======
const eventParticipants: EventParticipant[] = [
  // Event 301 - Team Meeting
  {
    id: 1,
    event_id: 301,
    member_id: 2,
    status: "attending",
    joined_at: "2025-08-10T09:00:00Z",
  },
  {
    id: 2,
    event_id: 301,
    member_id: 3,
    status: "invited",
    joined_at: "2025-08-10T09:05:00Z",
  },
  {
    id: 3,
    event_id: 301,
    member_id: 4,
    status: "declined",
    joined_at: "2025-08-10T09:10:00Z",
  },

  // Event 302 - Product Launch (public, كل الأعضاء يمكنهم الانضمام)
  {
    id: 4,
    event_id: 302,
    member_id: 2,
    status: "attending",
    joined_at: "2025-08-12T10:00:00Z",
  },
  {
    id: 5,
    event_id: 302,
    member_id: 3,
    status: "attending",
    joined_at: "2025-08-12T10:05:00Z",
  },
  {
    id: 6,
    event_id: 302,
    member_id: 4,
    status: "invited",
    joined_at: "2025-08-12T10:10:00Z",
  },

  // Event 303 - Design Workshop (private)
  {
    id: 7,
    event_id: 303,
    member_id: 2,
    status: "invited",
    joined_at: "2025-08-15T11:00:00Z",
  },
  {
    id: 8,
    event_id: 303,
    member_id: 4,
    status: "attending",
    joined_at: "2025-08-15T11:05:00Z",
  },

  // Event 304 - Project Deadline Alpha (company_only)
  {
    id: 9,
    event_id: 304,
    member_id: 2,
    status: "attending",
    joined_at: "2025-08-18T08:00:00Z",
  },
  {
    id: 10,
    event_id: 304,
    member_id: 3,
    status: "attending",
    joined_at: "2025-08-18T08:05:00Z",
  },
  {
    id: 11,
    event_id: 304,
    member_id: 4,
    status: "invited",
    joined_at: "2025-08-18T08:10:00Z",
  },
];

const events: EEvent[] = [
  {
    id: 301,
    title: "Team Meeting",
    description: "Weekly team sync",
    company_id: "company-uuid-1",
    created_by: "user-uuid-2",
    date: "2025-08-20",
    time: "10:00",
    duration: 60,
    location: "Zoom",
    event_type: "meeting",
    visibility: "company_only",
    created_at: "2025-08-01T08:00:00Z",
    updated_at: "2025-08-01T08:00:00Z",
  },
  {
    id: 302,
    title: "Product Launch",
    description: "Launch of new product",
    company_id: "company-uuid-1",
    created_by: "user-uuid-1",
    date: "2025-08-25",
    time: "15:00",
    duration: 120,
    location: "Head Office",
    event_type: "product_launch",
    visibility: "company_only",
    created_at: "2025-08-02T08:00:00Z",
    updated_at: "2025-08-02T08:00:00Z",
  },
  {
    id: 303,
    title: "Design Workshop",
    description: "UI/UX improvement session",
    company_id: "company-uuid-1",
    created_by: "user-uuid-4",
    date: "2025-08-22",
    time: "13:00",
    duration: 90,
    location: "Office Room 3",
    event_type: "workshop",
    visibility: "private",
    created_at: "2025-08-03T08:00:00Z",
    updated_at: "2025-08-03T08:00:00Z",
  },
  {
    id: 304,
    title: "Project Deadline Alpha",
    description: "Deadline for Project Alpha",
    company_id: "company-uuid-1",
    created_by: "user-uuid-2",
    date: "2025-08-30",
    time: "18:00",
    duration: 0,
    location: "",
    event_type: "deadline",
    visibility: "company_only",
    created_at: "2025-08-04T08:00:00Z",
    updated_at: "2025-08-04T08:00:00Z",
  },
  {
    id: 305,
    title: "CEO Birthday",
    description: "Celebrate CEO's birthday",
    company_id: "company-uuid-1",
    created_by: "user-uuid-1",
    date: "2025-08-28",
    time: "12:00",
    duration: 180,
    location: "Cafeteria",
    event_type: "birthday",
    visibility: "private",
    created_at: "2025-08-05T08:00:00Z",
    updated_at: "2025-08-05T08:00:00Z",
  },
  {
    id: 306,
    title: "Annual Conference",
    description: "Annual tech conference",
    company_id: "company-uuid-1",
    created_by: "user-uuid-1",
    date: "2025-09-10",
    time: "09:00",
    duration: 480,
    location: "Conference Hall",
    event_type: "conference",
    visibility: "company_only",
    created_at: "2025-08-06T08:00:00Z",
    updated_at: "2025-08-06T08:00:00Z",
  },
  {
    id: 307,
    title: "Movie Night",
    description: "Team bonding activity",
    company_id: "company-uuid-1",
    created_by: "user-uuid-5",
    date: "2025-08-29",
    time: "20:00",
    duration: 120,
    location: "Cinema Room",
    event_type: "movie",
    visibility: "company_only",
    created_at: "2025-08-07T08:00:00Z",
    updated_at: "2025-08-07T08:00:00Z",
  },
  {
    id: 308,
    title: "Project Beta Presentation",
    description: "Present Project Beta outcomes",
    company_id: "company-uuid-1",
    created_by: "user-uuid-3",
    date: "2025-09-01",
    time: "11:00",
    duration: 90,
    location: "Meeting Room 2",
    event_type: "presentation",
    visibility: "company_only",
    created_at: "2025-08-08T08:00:00Z",
    updated_at: "2025-08-08T08:00:00Z",
  },
];


export {
  activities,
  companies,
  eventParticipants,
  events,
  members,
  profiles,
  users,
 
};




// Mock UUIDs for users/members
const memberIds = [
  "user-uuid-1",
  "user-uuid-2",
  "user-uuid-3",
  "user-uuid-4",
  "user-uuid-5",
  "user-uuid-6",
  "user-uuid-7",
  "user-uuid-8",
];

const priorities: Project["priority"][] = ["low", "medium", "high"];
const projectStatuses: Project["status"][] = ["planned", "active", "completed", "archived"];
const stageStatuses: Stage["status"][] = ["planned", "in_progress", "completed", "archived"];
const taskStatuses: Task["status"][] = ["to_do", "in_progress", "completed", "backlog", "review"];
const taskPriorities: Task["priority"][] = ["low", "medium", "high"];
const taskGroups = ["Development", "Design", "Marketing", "QA", "Support"];

const projects: Project[] = Array.from({ length: 10 }, (_, i) => {
  const startDate = new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000);
  const endDate = new Date(startDate.getTime() + (Math.floor(Math.random() * 30) + 10) * 24 * 60 * 60 * 1000);
  const deadline = new Date(endDate.getTime() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000);

  const priority: Project["priority"] = priorities[Math.floor(Math.random() * priorities.length)];
  const status: Project["status"] = projectStatuses[Math.floor(Math.random() * projectStatuses.length)];

  return {
    id: i + 1,
    name: `Project ${i + 1}`,
    code: `PN${Math.floor(100000 + Math.random() * 900000)}`, // unique code
    description: `Description for project ${i + 1}`,
    owner_id: memberIds[Math.floor(Math.random() * memberIds.length)],
    company_id: "company-uuid-1",
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
    deadline: deadline.toISOString(),
    budget: [1000, 5000, 10000][Math.floor(Math.random() * 3)],
    currency: "USD",
    priority,
    status,
    image_url: "https://picsum.photos/200/300",
    created_at: startDate.toISOString(),
    updated_at: new Date().toISOString(),
  };
});


// Project Members
const projectMembers: ProjectMember[] = [];
projects.forEach((proj) => {
  const shuffled = memberIds.sort(() => 0.5 - Math.random());
  shuffled.slice(0, 4).forEach((memberId, idx) => {
    projectMembers.push({
      id: projectMembers.length + 1,
      project_id: proj.id,
      member_id: idx + 1,
      joined_at: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
    });
  });
});

// Stages
const stages: Stage[] = [];
projects.forEach((proj) => {
  const numStages = 3 + Math.floor(Math.random() * 3); // 3–5 stages
  for (let s = 0; s < numStages; s++) {
    const stageStart = new Date(proj.start_date);
    stageStart.setDate(stageStart.getDate() + s * 5);
    const stageEnd = new Date(stageStart.getTime() + 5 * 24 * 60 * 60 * 1000);

    stages.push({
      id: stages.length + 1,
      project_id: proj.id,
      name: `Stage ${s + 1}`,
      description: `Description for stage ${s + 1}`,
      order: s + 1,
      start_date: stageStart.toISOString(),
      end_date: stageEnd.toISOString(),
      status: stageStatuses[Math.floor(Math.random() * stageStatuses.length)],
      created_at: new Date(stageStart.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
});

// Tasks
const tasks: Task[] = [];
stages.forEach((stage) => {
  const numTasks = 3 + Math.floor(Math.random() * 5); // 3–7 tasks per stage
  for (let t = 0; t < numTasks; t++) {
    const assignee = memberIds[Math.floor(Math.random() * memberIds.length)];
    const reporter = memberIds[Math.floor(Math.random() * memberIds.length)];
    const createBy = memberIds[Math.floor(Math.random() * memberIds.length)];
    const dueOffset = Math.floor(Math.random() * 30);
    const estimatedTime = [60, 120, 180, 240][Math.floor(Math.random() * 4)];
    const spentTime = Math.floor(Math.random() * estimatedTime);

    tasks.push({
      id: tasks.length + 1,
      stage_id: stage.id,
      group: taskGroups[Math.floor(Math.random() * taskGroups.length)],
      reporter_id: reporter,
      name: `Task ${tasks.length + 1} - ${taskGroups[Math.floor(Math.random() * taskGroups.length)]}`,
      description: `Description for task ${tasks.length + 1}`,
      assignee_id: assignee,
      create_by_id: createBy,
      estimated_time: estimatedTime,
      spent_time: spentTime,
      due_date: new Date(Date.now() + dueOffset * 24 * 60 * 60 * 1000).toISOString(),
      priority: taskPriorities[Math.floor(Math.random() * taskPriorities.length)],
      status: taskStatuses[Math.floor(Math.random() * taskStatuses.length)],
      progress: Math.floor(Math.random() * 101),
      created_at: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
});

export { projects, projectMembers, stages, tasks };

