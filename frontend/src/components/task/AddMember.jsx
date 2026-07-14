import { useState } from "react";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useMemberStore } from "@/store/memberStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMemberToProject } from "@/schemas/memberSchema";

const AddMember = () => {
    const [open, setOpen] = useState(false);

    const { projectId } = useParams();

    const { addMember, fetchAllMembers, isLoading } = useMemberStore();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(addMemberToProject),
        defaultValues: {
            email: "",
            role: "member",
        },
    });

    const onSubmit = async (data) => {
        await addMember(projectId, data);
        await fetchAllMembers(projectId);

        reset();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Member
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Project Member</DialogTitle>
                    <DialogDescription>
                        Invite an existing user to collaborate on this project.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4 py-2">
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="john@gmail.com"
                                className="mt-2"
                                {...register("email")}
                            />
                        </div>

                        <div>
                            <Label>Role</Label>

                            <Select
                                defaultValue="member"
                                onValueChange={(value) => setValue("role", value)}
                            >
                                <SelectTrigger className="mt-2">
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="member">
                                        Member
                                    </SelectItem>

                                    <SelectItem value="project_admin">
                                        Project Admin
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isLoading}>
                            <UserPlus className="w-4 h-4 mr-2" />
                            {isLoading ? "Adding..." : "Add Member"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddMember;