import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useProjectStore } from "@/store/projectStore";
import { createProjectSchema } from "@/schemas/projectSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Main = () => {
  const { createProject, projects, isLoading, error } = useProjectStore();
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProjectSchema),
  });

  const onSubmit = async (data) => {
    await createProject(data);
    reset(); 
    setShowForm(false); 
  };

   const handleLogout = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/v1/logout`;
  };

  return (
    <div className="p-6 flex-1 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      <Button onClick={() => setShowForm(!showForm)} className="mb-4">
        {showForm ? "Cancel" : "Create Project"}
      </Button>

      {showForm && (
        <Card className="mb-6 max-w-lg">
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="Project Name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              <Textarea
                placeholder="Project Description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}

              <Input
                placeholder="Created By"
                {...register("createdBy")}
              />
              {errors.createdBy && (
                <p className="text-red-500 text-sm">
                  {errors.createdBy.message}
                </p>
              )}

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Project"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {error &&
        error.map((errMsg, i) => (
          <p key={i} className="text-red-500">
            {errMsg}
          </p>
        ))}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <Card key={project._id} className="shadow">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{project.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Created by: {project.createdBy}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Main;


