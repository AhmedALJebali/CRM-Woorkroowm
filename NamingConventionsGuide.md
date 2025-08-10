# Naming Conventions Guide for Next.js + TypeScript Project

## Purpose
Establish consistent naming conventions across the codebase to ensure readability, maintainability, and team collaboration.

## Folder & File Naming

| Item                  | Convention         | Example                        |
|-----------------------|--------------------|--------------------------------|
| Component files       | PascalCase.tsx     | LoginForm.tsx, ProjectCard.tsx |
| Component Folders     | PascalCase         | SignupForm/                    |
| Utility/helper files  | camelCase.ts       | formatDate.ts, fetchUser.ts    |
| Redux slice files     | camelCaseSlice.ts  | authSlice.ts, projectSlice.ts  |
| General function files| camelCase.ts       | sendRequest.ts, uploadImage.ts |
| Folders               | kebab-case or camelCase | auth/, projectPages/      |

## Variable & Function Naming

| Item             | Convention  | Example                      |
|------------------|-------------|------------------------------|
| Variables        | camelCase   | isLoading, userData          |
| Functions        | camelCase   | handleSubmit, fetchProjects  |
| useState naming  | [value, setValue] | [email, setEmail]      |
| Redux actions    | camelCase   | loginUser, fetchProjects     |

## Component Naming

| Item                  | Convention  | Example                        |
|-----------------------|-------------|--------------------------------|
| React components      | PascalCase  | SignupForm, DashboardCard      |
| Multi-step form steps | StepX_Description.tsx | Step1_AccountInfo.tsx |

## Constants Naming

| Item          | Convention        | Example                |
|---------------|-------------------|------------------------|
| Global constants | UPPER_SNAKE_CASE | API_BASE_URL, MAX_FILE_SIZE_MB |

## Type & Interface Naming

| Item       | Convention   | Example                          |
|------------|--------------|----------------------------------|
| Interfaces & Types | PascalCase | User, ProjectPayload, AuthState |
| Enums       | PascalCase with UPPER_CASE members | enum Status { ACTIVE, PENDING } |

## Summary

| Element        | Convention       |
|----------------|------------------|
| Components     | PascalCase       |
| Variables      | camelCase        |
| Functions      | camelCase        |
| Types/Interfaces | PascalCase     |
| Constants      | UPPER_SNAKE_CASE |
| Files          | camelCase or PascalCase |