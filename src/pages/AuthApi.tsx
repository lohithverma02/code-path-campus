
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const AuthApi = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Authentication API</h1>
        <p className="text-gray-500">
          Secure, modular authentication and user management endpoints for Campus Bridge platform
        </p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6 bg-muted w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="models">Data Models</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication System</CardTitle>
              <CardDescription>
                The authentication system provides secure user registration, login, and profile management.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">Key Features</h3>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                  <li>JWT-based authentication</li>
                  <li>Role-based access control (student and faculty roles)</li>
                  <li>Password hashing with bcrypt</li>
                  <li>Token validation middleware</li>
                  <li>Profile management</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-lg">Supported Roles</h3>
                <div className="mt-2 space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Student</h4>
                      <p className="text-sm text-gray-600">Access to courses, assignments, coding practice, and AI assistants.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Faculty</h4>
                      <p className="text-sm text-gray-600">Create courses, manage assignments, and review student progress.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Authentication Flow</CardTitle>
              <CardDescription>
                How the authentication system works in Campus Bridge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md bg-gray-50">
                  <h3 className="font-medium">Registration Process</h3>
                  <ol className="mt-2 space-y-2 text-sm text-gray-600 list-decimal list-inside">
                    <li>User submits registration form with name, email, password, and role</li>
                    <li>System validates that role is either student or faculty</li>
                    <li>System checks if email is already registered</li>
                    <li>Password is hashed using bcrypt</li>
                    <li>User is created in the database</li>
                    <li>JWT token is generated and returned</li>
                  </ol>
                </div>
                
                <div className="p-4 border rounded-md bg-gray-50">
                  <h3 className="font-medium">Login Process</h3>
                  <ol className="mt-2 space-y-2 text-sm text-gray-600 list-decimal list-inside">
                    <li>User submits email and password</li>
                    <li>System checks if user exists</li>
                    <li>System verifies password against stored hash</li>
                    <li>JWT token is generated with user ID and role</li>
                    <li>Token is returned to client</li>
                  </ol>
                </div>
                
                <div className="p-4 border rounded-md bg-gray-50">
                  <h3 className="font-medium">Authorization</h3>
                  <ol className="mt-2 space-y-2 text-sm text-gray-600 list-decimal list-inside">
                    <li>Client includes JWT token in Authorization header</li>
                    <li>Server middleware validates token</li>
                    <li>Role-based middleware checks if user has required role</li>
                    <li>If authorized, request proceeds to handler</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">POST</span>
                  <CardTitle className="text-base">/auth/register</CardTitle>
                </div>
                <CardDescription>Register a new user</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Request Body</h3>
                  <pre className="mt-2 bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`{
  "name": "John Smith",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "student" // or "faculty"
}`}
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Response (200 OK)</h3>
                  <pre className="mt-2 bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`{
  "user": {
    "id": "uuid",
    "name": "John Smith",
    "email": "john@example.com",
    "role": "student",
    "createdAt": "2023-01-01T12:00:00Z"
  },
  "token": "jwt.token.here"
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">POST</span>
                  <CardTitle className="text-base">/auth/login</CardTitle>
                </div>
                <CardDescription>Login with email and password</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Request Body</h3>
                  <pre className="mt-2 bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`{
  "email": "john@example.com",
  "password": "securepassword"
}`}
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Response (200 OK)</h3>
                  <pre className="mt-2 bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`{
  "user": {
    "id": "uuid",
    "name": "John Smith",
    "email": "john@example.com",
    "role": "student"
  },
  "token": "jwt.token.here"
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">GET</span>
                  <CardTitle className="text-base">/auth/me</CardTitle>
                </div>
                <CardDescription>Get current user profile</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Headers</h3>
                  <pre className="mt-2 bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`Authorization: Bearer jwt.token.here`}
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Response (200 OK)</h3>
                  <pre className="mt-2 bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`{
  "id": "uuid",
  "name": "John Smith",
  "email": "john@example.com",
  "role": "student",
  "createdAt": "2023-01-01T12:00:00Z"
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center space-x-2">
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">PUT</span>
                  <CardTitle className="text-base">/users/update</CardTitle>
                </div>
                <CardDescription>Update user profile</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Headers</h3>
                  <pre className="mt-2 bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`Authorization: Bearer jwt.token.here`}
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Request Body</h3>
                  <pre className="mt-2 bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`{
  "name": "John Updated Smith",
  "bio": "Computer Science Student"
}`}
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Response (200 OK)</h3>
                  <pre className="mt-2 bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`{
  "id": "uuid",
  "name": "John Updated Smith",
  "email": "john@example.com",
  "bio": "Computer Science Student",
  "role": "student",
  "updatedAt": "2023-01-02T12:00:00Z"
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">GET</span>
                  <CardTitle className="text-base">/users/:id</CardTitle>
                </div>
                <CardDescription>Get user by ID</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Headers</h3>
                  <pre className="mt-2 bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`Authorization: Bearer jwt.token.here`}
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Response (200 OK)</h3>
                  <pre className="mt-2 bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`{
  "id": "uuid",
  "name": "John Smith",
  "email": "john@example.com",
  "role": "student",
  "createdAt": "2023-01-01T12:00:00Z"
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">GET</span>
                  <CardTitle className="text-base">/users/role/:role</CardTitle>
                </div>
                <CardDescription>Get users by role</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Headers</h3>
                  <pre className="mt-2 bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`Authorization: Bearer jwt.token.here`}
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Response (200 OK)</h3>
                  <pre className="mt-2 bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`{
  "users": [
    {
      "id": "uuid1",
      "name": "John Smith",
      "email": "john@example.com",
      "role": "student"
    },
    {
      "id": "uuid2",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "student"
    }
  ],
  "total": 2
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>User Model</CardTitle>
              <CardDescription>
                Database schema for the User model
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 p-6 rounded-md overflow-x-auto">
{`User {
  id: UUID,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum('student', 'faculty'),
  bio: String (optional),
  profilePicture: String (optional, URL),
  createdAt: Timestamp,
  updatedAt: Timestamp
}`}
              </pre>
              
              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Field Descriptions</h3>
                <div className="space-y-2">
                  <div className="flex">
                    <div className="w-1/4 font-medium">id</div>
                    <div>Unique identifier for the user (UUID v4)</div>
                  </div>
                  <Separator />
                  
                  <div className="flex">
                    <div className="w-1/4 font-medium">name</div>
                    <div>User's full name</div>
                  </div>
                  <Separator />
                  
                  <div className="flex">
                    <div className="w-1/4 font-medium">email</div>
                    <div>User's email address (must be unique)</div>
                  </div>
                  <Separator />
                  
                  <div className="flex">
                    <div className="w-1/4 font-medium">password</div>
                    <div>Bcrypt hashed password</div>
                  </div>
                  <Separator />
                  
                  <div className="flex">
                    <div className="w-1/4 font-medium">role</div>
                    <div>User role - either "student" or "faculty"</div>
                  </div>
                  <Separator />
                  
                  <div className="flex">
                    <div className="w-1/4 font-medium">bio</div>
                    <div>Optional user biography</div>
                  </div>
                  <Separator />
                  
                  <div className="flex">
                    <div className="w-1/4 font-medium">profilePicture</div>
                    <div>Optional URL to profile picture</div>
                  </div>
                  <Separator />
                  
                  <div className="flex">
                    <div className="w-1/4 font-medium">createdAt</div>
                    <div>Timestamp when user was created</div>
                  </div>
                  <Separator />
                  
                  <div className="flex">
                    <div className="w-1/4 font-medium">updatedAt</div>
                    <div>Timestamp when user was last updated</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Registration Example</CardTitle>
                <CardDescription>
                  Example of registering a new student user
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Request</h3>
                    <pre className="mt-2 bg-gray-50 p-4 rounded-md overflow-x-auto">
{`// POST /auth/register
{
  "name": "John Smith",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "student"
}`}
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Response</h3>
                    <pre className="mt-2 bg-gray-50 p-4 rounded-md overflow-x-auto">
{`{
  "user": {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "name": "John Smith",
    "email": "john@example.com",
    "role": "student",
    "createdAt": "2023-05-15T10:30:45Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNDdhYzEwYi01OGNjLTQzNzItYTU2Ny0wZTAyYjJjM2Q0NzkiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTY4NDAzNjY0NX0.example-token"
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Login Example</CardTitle>
                <CardDescription>
                  Example of logging in as a faculty user
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Request</h3>
                    <pre className="mt-2 bg-gray-50 p-4 rounded-md overflow-x-auto">
{`// POST /auth/login
{
  "email": "professor@university.edu",
  "password": "faculty123"
}`}
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Response</h3>
                    <pre className="mt-2 bg-gray-50 p-4 rounded-md overflow-x-auto">
{`{
  "user": {
    "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    "name": "Professor Johnson",
    "email": "professor@university.edu",
    "role": "faculty"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMGVlYmM5OS05YzBiLTRlZjgtYmI2ZC02YmI5YmQzODBhMTEiLCJyb2xlIjoiZmFjdWx0eSIsImlhdCI6MTY4NDAzNjY0NX0.example-token"
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Protected Route Example</CardTitle>
                <CardDescription>
                  Example of accessing a protected route with JWT
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Request</h3>
                    <pre className="mt-2 bg-gray-50 p-4 rounded-md overflow-x-auto">
{`// GET /auth/me
// Headers:
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNDdhYzEwYi01OGNjLTQzNzItYTU2Ny0wZTAyYjJjM2Q0NzkiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTY4NDAzNjY0NX0.example-token"
}`}
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Response</h3>
                    <pre className="mt-2 bg-gray-50 p-4 rounded-md overflow-x-auto">
{`{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "name": "John Smith",
  "email": "john@example.com",
  "role": "student",
  "bio": "Computer Science undergraduate",
  "createdAt": "2023-05-15T10:30:45Z"
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthApi;
