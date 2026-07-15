import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "@/components/homedesign/Navbar";
import ProjectHeader from "@/components/projects/ProjectHeader";
import AddMember from "@/components/task/AddMember";
import { Button } from "@/components/ui/button";

import { useProjectStore } from "@/store/projectStore";
import { useMemberStore } from "@/store/memberStore";
import { Pencil, Trash2 } from "lucide-react";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { project, getProject } = useProjectStore();
  const { members, fetchAllMembers, removeMember } = useMemberStore();
  console.log("member name", members)
  useEffect(() => {
    if (projectId) {
      getProject(projectId);
      fetchAllMembers(projectId);
    }
  }, [projectId]);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full p-6 space-y-6">
      <Navbar />

      <ProjectHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Members */}
        <div className="lg:col-span-2 rounded-2xl border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div>
              <h2 className="text-xl font-semibold">Project Members</h2>
              <p className="text-sm text-muted-foreground">
                Manage project members.
              </p>
            </div>

            <AddMember />
          </div>

          <div className="p-5">
            {members?.length ? (
              <>
                {/* Table Header */}
                <div className="grid grid-cols-3 items-center border-b border-border pb-3 mb-2 text-sm font-semibold text-muted-foreground">
                  <p>Name</p>
                  <p>Role</p>
                  <p className="text-right">Actions</p>
                </div>

                {/* Members */}
                {members.map((member) => (
                  <div
                    key={member._id}
                    className="grid grid-cols-3 items-center py-3 border-b border-border last:border-none hover:bg-muted/40 transition-colors"
                  >
                    <p className="font-medium">
                      {member.user?.username}
                    </p>

                    <p className="capitalize text-muted-foreground">
                      {member.role.replaceAll("_", " ")}
                    </p>

                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:text-red-500"
                        onClick={() =>
                          removeMember(projectId, member._id)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="py-10 text-center text-muted-foreground">
                No members found.
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="rounded-2xl border bg-card shadow-sm p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">Project Overview</h2>

          <div className="rounded-xl border border-border bg-background p-5 mb-6">
            <p className="text-sm text-muted-foreground">Total Members</p>

            <h1 className="mt-2 text-4xl font-bold">
              {members?.length || 0}
            </h1>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full"
              onClick={() =>
                navigate(`/projects/${projectId}/kanban?open=create`)
              }
            >
              + Add Task
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate(`/projects/${projectId}/kanban`)}
            >
              View Tasks
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;