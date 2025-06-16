import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
// import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(data.user, null, 2)}
        </pre>
      </div>
      {/* <div>
        <h2 className="font-bold text-2xl mb-4">Next steps</h2>
        <FetchDataSteps />
      </div> */}

      


      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Lead Management</h1>
        <div className="mb-4">
          <input type="text" id="leadName" placeholder="Lead Name" className="p-2 border rounded" />
          <input type="text" id="leadRole" placeholder="Lead Role" className="p-2 border rounded ml-2" />
          <input type="text" id="companyName" placeholder="Company Name" className="p-2 border rounded ml-2" />
          <input type="text" id="linkedinUrl" placeholder="LinkedIn URL" className="p-2 border rounded ml-2" />
          
          {/* the btn is to addLead */}
          <button className="bg-blue-500 text-white p-2 rounded ml-2">Add Lead</button>
        </div>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Company</th>
              <th className="py-2 px-4 border">Linkedin URL</th>
              <th className="py-2 px-4 border">
                                <div className="relative inline-block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="inline-block px-4 py-2 bg-white border rounded"
                        type="button"
                        aria-expanded="false"
                      >
                        Actions
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow"
                    >
                      <DropdownMenuItem>
                        <a href="#" className="block px-4 py-2">
                          Generate
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <a href="#" className="block px-4 py-2">
                          Delete
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <a href="#" className="block px-4 py-2">
                          Details
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </th>
            </tr>
          </thead>
          <tbody id="leadsTableBody">
            {/* <!-- Leads will be added here dynamically --> */}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}
