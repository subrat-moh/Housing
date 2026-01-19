# Property Maintenance Website (India) — Product & Technical Specification

## 1) Document purpose
This document specifies the **requirements and technical design** for a web platform that helps **property owners (often NRIs / out-of-city owners)** in India subscribe to a company’s **property maintenance services**. It is intended to be detailed enough for engineering teams to build, test, and launch the product.

## 2) Product summary
### 2.1 Concept
Users add their property in India, choose a plan, pay a **one-time setup fee**, then pay a **monthly subscription**. The company manages maintenance through scheduled inspections, service requests, vendors/field staff, photo/video proof, and monthly reports.

### 2.2 Primary outcomes
- Owners feel confident their home is cared for remotely.
- Company can standardize operations: inspections, tickets, vendor dispatch, billing, reporting.
- Clear proof-of-work: photos, checklists, time stamps, and audit logs.

## 3) Assumptions (explicit)
- Focus is **India properties** (addresses, city/state/pincode formats, local vendors).
- Payments in INR using an India payment gateway.
- The website includes both:
  - a **customer-facing portal** (owners)
  - an **operations/admin portal** (company staff + vendors)
- Service delivery is “managed” (company assigns staff/vendors) rather than marketplace bidding.

## 4) Key roles & permissions (RBAC)
### 4.1 Roles
- **Guest**: can browse marketing pages, pricing, FAQ.
- **Owner (Customer)**: manages profile, properties, subscription, service requests, documents, reports, payments.
- **Admin (Ops Manager)**: full control, plan management, customer management, assignment, approvals, billing adjustments, refunds, dashboards.
- **Field Staff**: performs inspections/tasks, uploads evidence, completes checklists.
- **Vendor/Contractor**: receives assigned jobs, quotes (if enabled), uploads completion proof, invoices (if enabled).
- **Finance** (optional separate role): invoicing, reconciliation, refunds, GST reports.
- **Support** (optional): ticket replies, escalation, SLA handling.

### 4.2 Permission model
- Use **RBAC + resource scoping**:
  - Owners can access only their own properties/tickets/files/payments.
  - Vendors see only assigned jobs.
  - Staff see jobs assigned to their team/region.
  - Admin can see all.

## 5) Commercial model
### 5.1 Fees
- **One-time setup fee** (per customer and/or per property; decide during implementation).
- **Monthly subscription** (per property plan).

### 5.2 Plan types (example)
- Basic: monthly inspection + emergency coordination.
- Standard: inspections + minor fixes allowance + reporting.
- Premium: inspections + priority response + more visits.

### 5.3 Add-ons
- Deep cleaning, painting, pest control, renovations, utility management, tenant management (future).

## 6) MVP scope (must ship to launch)
### 6.1 Customer-facing (Owner portal)
- Account signup/login (email + OTP; optional passwordless).
- Profile management (name, phone, email, address, identity info if needed).
- Property onboarding:
  - Add property address + geo pin (optional)
  - Upload ownership/authorization docs (optional)
  - Property details (type, size, rooms, access instructions, caretaker contact)
- Plan selection and purchase:
  - One-time setup + subscription checkout
  - Subscription status page (active/past due/cancelled)
- Service requests (tickets):
  - Create request with category, description, preferred time, attachments
  - Track status timeline (created → assigned → in progress → completed → closed)
  - Approvals if cost exceeds plan threshold (optional)
- Inspections:
  - View inspection schedule/calendar
  - View completed inspection report (checklist + photos/videos)
- Billing & payments:
  - View invoices/receipts, next payment date, payment history
  - Update billing details
- Notifications:
  - Email/SMS/WhatsApp: payment reminders, job updates, inspection report ready
- Support:
  - Help center + contact support form

### 6.2 Operations/Admin portal (core)
- Customer management (search, view, activate/suspend).
- Property management (view details, assign region/team).
- Plan & pricing management (create/edit plans, setup fee, add-ons).
- Work order management:
  - Intake from owner tickets and scheduled inspections
  - Assignment to staff/vendor
  - SLA tracking and escalation
- Inspection templates:
  - Configurable checklist per property type/plan
  - Required evidence rules (e.g., “min 8 photos”)
- Evidence & reporting:
  - View uploaded media with timestamps and notes
  - Generate PDF report for inspection/job (download + email to owner)
- Billing/admin:
  - Manual invoice creation for out-of-plan work (optional MVP)
  - Refund/cancel flow (via payment gateway capabilities)
- Audit log (minimum): who changed status, assignments, approvals.

### 6.3 Field staff / vendor portal (minimal MVP)
- Login and see assigned jobs.
- Job execution:
  - Checklist completion (if inspection)
  - Add notes + upload photos/videos
  - Mark job complete

## 7) V1 / post-MVP enhancements
- Quotation workflow (vendor quote → owner approval → job start).
- Wallet/credit system (prepaid maintenance credits).
- Tenant management (rent collection, tenant tickets).
- Utility bill payments coordination.
- Multi-language (English + Hindi at minimum).
- Mobile app (React Native/Flutter) once workflows stabilize.
- Integrations: CCTV snapshot checks (if owner provides), IoT sensors, etc.

## 8) Detailed functional requirements
### 8.1 Authentication & onboarding
- Email/phone OTP login; enforce verified phone/email.
- Optional SSO later.
- Device/session management: logout other devices.
- Rate limiting for OTP and login attempts.

### 8.2 Property management
- Multiple properties per owner.
- Property attributes:
  - Address fields: line1, line2, locality, city, state, pincode, country=IN
  - Property type: apartment/villa/independent house/plot
  - Access instructions (sensitive: encrypted at rest)
  - Keys/lockbox details (store minimal; encourage offline handling)
  - Preferred contact: caretaker/neighbor
- Property “health profile”: last inspection date, open issues, next scheduled visit.

### 8.3 Subscription & payments
- Must support:
  - One-time setup charge
  - Monthly recurring subscription per property
  - Pause/cancel subscription (policy-defined)
  - Dunning/retry for failed payments
- Invoices/receipts downloadable (PDF).
- Taxes:
  - Support GST fields (GSTIN for company; customer GSTIN optional)
  - Store tax breakdown per invoice line item

### 8.4 Tickets / service requests
- Categories: plumbing, electrical, cleaning, pest control, security check, general, emergency.
- Priorities: low/normal/high/emergency (rules + SLA).
- Statuses: new, triaged, assigned, scheduled, in_progress, waiting_for_approval, completed, closed, cancelled.
- Each ticket has:
  - timeline events (immutable log)
  - attachments (owner + staff uploads)
  - internal notes (ops-only) vs public notes (owner-visible)

### 8.5 Inspections
- Auto-schedule based on plan (e.g., 1/month).
- Inspection checklist template:
  - room-by-room items, photos required, meter readings, dampness checks, etc.
- Outputs:
  - structured checklist results
  - media
  - summary notes
  - issues created from failed items (optional: create tickets automatically)

### 8.6 Reporting
- Monthly property report:
  - inspections done
  - issues found/resolved
  - spend summary (in-plan vs out-of-plan)
  - next actions
- PDF generation and email delivery.

### 8.7 Notifications
- Channels:
  - Email (transactional)
  - SMS (India providers)
  - WhatsApp (optional, recommended for owners)
- Event triggers:
  - subscription activated/cancelled
  - payment success/failure
  - ticket status changes
  - inspection scheduled/completed
  - approval required

### 8.8 Admin configuration
- Regions/teams:
  - define cities/areas and assign staff
- SLA rules:
  - per priority
  - escalation schedule
- Templates:
  - email/SMS/WhatsApp templates (versioned)

## 9) UX / pages (website sitemap)
### 9.1 Marketing site
- Home
- How it works
- Services
- Pricing
- Cities/coverage
- About
- FAQ
- Contact
- Login / Sign up

### 9.2 Owner portal
- Dashboard (property cards, next visit, open tickets, subscription status)
- Properties
  - Add/Edit property
  - Property details → reports, tickets, documents
- Requests/Tickets (list + detail)
- Inspections/Reports (list + detail + PDF)
- Subscription/Billing
- Profile & settings
- Support

### 9.3 Admin portal
- Dashboard (KPIs, overdue jobs, SLA breaches)
- Customers
- Properties
- Tickets/Work orders
- Inspections (schedule + templates)
- Vendors & staff
- Plans & pricing
- Billing/invoices
- Reports exports
- Audit log

### 9.4 Field staff/vendor portal
- My jobs (today/week)
- Job detail (checklist, upload, notes)

## 10) System architecture (recommended)
### 10.1 High-level components
- **Frontend**: Web app for marketing + portals
- **Backend API**: Authentication, business logic, workflows
- **Database**: relational (core entities)
- **Object storage**: photos/videos/documents
- **Async workers/queue**: emails, PDFs, reminders
- **Notification service**: email/SMS/WhatsApp integrations

### 10.2 Recommended stack (pragmatic)
- **Frontend**: Next.js (React) + TypeScript
- **Backend**: NestJS (Node.js) + TypeScript (or Django if team prefers Python)
- **DB**: PostgreSQL
- **Cache/queue**: Redis + BullMQ (Node) or Celery (Python)
- **File storage**: S3-compatible (AWS S3) with pre-signed uploads
- **PDF generation**: server-side HTML→PDF (Playwright/Chromium) in a worker
- **Auth**: JWT + refresh tokens; OTP provider integration

### 10.3 Environments
- dev, staging, production
- Separate databases + storage buckets per env

## 11) Data model (core entities)
### 11.1 Entities
- **User**
  - id, name, email, phone, role(s), status, created_at
- **OwnerProfile**
  - user_id, communication_preferences, timezone, billing_details
- **Property**
  - id, owner_id, address fields, geo, type, metadata, status
- **Plan**
  - id, name, monthly_price, setup_fee, visit_frequency, included_services, policy_json
- **Subscription**
  - id, owner_id, property_id, plan_id, gateway_customer_id, gateway_subscription_id, status, start/end, next_renewal
- **Invoice**
  - id, owner_id, property_id, subscription_id, currency, subtotal, tax, total, status, pdf_url
- **Payment**
  - id, invoice_id, gateway_payment_id, status, amount, method, created_at
- **Ticket (ServiceRequest)**
  - id, property_id, created_by, category, priority, status, description, scheduled_at
- **WorkOrder**
  - id, ticket_id (nullable for scheduled inspections), assigned_to_type (staff/vendor), assigned_to_id, status, sla_due_at
- **Inspection**
  - id, property_id, scheduled_at, completed_at, template_id, summary
- **ChecklistTemplate**
  - id, name, version, items_json
- **ChecklistResult**
  - id, inspection_id, results_json, score, created_at
- **MediaAsset**
  - id, owner_id/property_id/ticket_id/inspection_id, type, storage_key, url, captured_at, uploaded_by
- **AuditEvent**
  - id, actor_user_id, entity_type, entity_id, action, before_json, after_json, created_at

### 11.2 Relationships (summary)
- Owner(User) 1—N Property
- Property 1—N Ticket
- Property 1—N Inspection
- Property 1—1 Active Subscription (at a time)
- Ticket 1—N WorkOrder (optional)
- Inspection 1—1 ChecklistResult
- Many entities 1—N MediaAsset

## 12) API specification (initial contracts)
All APIs are JSON over HTTPS. Versioned under `/api/v1`.

### 12.1 Auth
- `POST /auth/request-otp` (email/phone)
- `POST /auth/verify-otp` → returns access + refresh token
- `POST /auth/refresh`
- `POST /auth/logout`

### 12.2 Owner: properties
- `GET /properties`
- `POST /properties`
- `GET /properties/:id`
- `PATCH /properties/:id`
- `POST /properties/:id/documents` (metadata, use pre-signed upload)

### 12.3 Plans & subscriptions
- `GET /plans`
- `POST /checkout/session` (setup + subscription)
- `GET /subscriptions`
- `POST /subscriptions/:id/cancel`

### 12.4 Tickets
- `GET /tickets`
- `POST /tickets`
- `GET /tickets/:id`
- `POST /tickets/:id/messages` (public notes)
- `POST /tickets/:id/assets` (attachments via pre-signed upload)

### 12.5 Inspections & reports
- `GET /inspections?propertyId=...`
- `GET /inspections/:id`
- `GET /inspections/:id/report.pdf`

### 12.6 Admin
- `GET /admin/customers`
- `GET /admin/tickets`
- `PATCH /admin/tickets/:id` (assign, status changes)
- `GET /admin/inspections/schedule`
- `POST /admin/inspection-templates`

### 12.7 Webhooks
- `POST /webhooks/payments` (gateway events: paid/failed/subscription cancelled)

## 13) Security & privacy requirements
### 13.1 Security controls
- TLS everywhere; HSTS in production.
- Passwordless/OTP: enforce rate limits and IP throttling.
- Store secrets in managed secret store (AWS Secrets Manager).
- Encrypt sensitive fields at rest (access instructions, caretaker phone).
- Pre-signed URLs for uploads; never proxy large media through the API.
- Strict RBAC checks on every resource.
- Audit trail for admin actions.
- OWASP top 10 controls (input validation, CSRF where applicable, secure headers).

### 13.2 Privacy & compliance (India)
- Comply with India’s **Digital Personal Data Protection (DPDP) Act** principles:
  - consent/notice, purpose limitation, retention, deletion on request (policy-defined)
- Data retention policy:
  - keep invoices for statutory period
  - media retention configurable (e.g., 24 months)

## 14) Observability & operations
- Logging: structured JSON logs (request id, user id, entity id).
- Monitoring: uptime checks, API latency, queue depth, error rate.
- Alerting: SLA breach alerts, failed payment spikes, upload failures.
- Backups: automated DB backups + restore drills.
- Admin exports: CSV/PDF where needed (secured).

## 15) Performance & non-functional requirements
- Availability target: 99.5% MVP, improve to 99.9% later.
- P95 API latency: < 500ms for standard reads (excluding media uploads).
- Media uploads: support at least 20MB photos and short videos (limit configurable).
- Scalability: multi-city/region support; partition workloads by region/team.

## 16) Testing & QA
- Unit tests for business rules (plans, SLA, status transitions).
- Integration tests for payment webhooks.
- E2E smoke tests for:
  - signup → add property → buy plan → create ticket → complete ticket
- Security tests: dependency scanning + basic SAST.

## 17) Deployment (reference)
- Cloud: AWS (recommended)
  - Frontend: Vercel or CloudFront+S3/Amplify
  - Backend: ECS/Fargate or EKS (later)
  - DB: RDS Postgres
  - Cache/Queue: ElastiCache Redis
  - Storage: S3
- CI/CD: build, test, deploy to staging then production with approvals.

## 18) Acceptance criteria (MVP “done”)
- Owner can: sign up → add property → purchase setup+subscription → raise ticket → view updates → receive a completion report.
- Ops can: configure plans → see customers/properties → assign ticket/inspection → collect evidence → generate report → see payment status.
- Payments: successful subscription activation and webhook-driven status sync.
- Security: RBAC enforced; no cross-customer data access.

## 19) Open decisions (documented for implementation)
- Setup fee charging model: per customer vs per property.
- Plan visit frequency and included services policy.
- Whether vendors can submit quotes (MVP: optional; V1 recommended).
- WhatsApp channel availability and template approvals.

