import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema } from "@/schemas/projectSchema";
import { useProjectStore } from "@/store/projectStore";
import { Link } from "react-router-dom";

const Main = () => {
  const { createProject, getAllProjects, projects, isLoading } =
    useProjectStore();
  

  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProjectSchema),
  });

  useEffect(() => {
    getAllProjects();
  }, [getAllProjects]);

  const onSubmit = async (data) => {
    await createProject(data);
    reset();
    setShowForm(false);
  };

  return (
    <div className=" flex-1 ">
      {/* Header row */}
    <div className="bg-gray-100 p-4 space-y-6">
        <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Create Project"}
        </Button>
      </div>

      {/* Create Project Section */}
      {showForm && (
        <div>
          <Card className="max-w-lg shadow-md">
            <CardHeader>
              <CardTitle>Create New Project</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Project Name */}
                <div>
                  <Input placeholder="Project Name" {...register("name")} />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Project Description */}
                <div>
                  <Textarea
                    placeholder="Project Description"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Project"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>

    

      {/* All Projects Section */}
      <div className=" p-4 space-y-6">
        <h3 className="text-xl font-bold mb-4">All Projects</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project) => (
            <Link to={`/project/${project._id}`} key={project._id} >
            <Card
              key={project._id}
              className="shadow hover:shadow-lg transition"
            >
              <CardHeader>
                <CardTitle><h2 className="text-xl font-semibold">{project.name}</h2></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{project.description}</p>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;

