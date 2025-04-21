import { Button } from "@/components/ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Info, Search } from "lucide-react";
import { useState } from "react";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const Toolbar = () => {
	const workspaceId = useWorkspaceId();
	const router = useRouter();

	const { data } = useGetWorkspace({ id: workspaceId });
	const { data: channels } = useGetChannels({ workspaceId });
	const { data: members } = useGetMembers({ workspaceId });

	const [open, setOpen] = useState(false);
	const onChannelClick = (channelId: string) => {
		setOpen(false);
		router.push(`/workspace/${workspaceId}/channel/${channelId}`);
	};
	const onMemberClick = (memberId: string) => {
		setOpen(false);
		router.push(`/workspace/${workspaceId}/member/${memberId}`);
	};

	return (
		<nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
			<div className="flex-1"></div>
			<div className="min-w-[280px] max-[642px] grow-[2] shrink">
				<Button
					onClick={() => setOpen(true)}
					size="sm"
					className="bg-accent/25 dark:bg-[#532754] hover:bg-accent/30 dark:hover:bg-[#5d2c5e] w-full justify-start h-7 px-2"
				>
					<Search className="size-4 text-white mr-2" />
					<span className="text-white text-xs">
						Search {data?.name}
					</span>
				</Button>
			</div>
			<CommandDialog onOpenChange={setOpen} open={open}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Channels">
						{channels?.map((channel) => (
							<CommandItem
								onSelect={() => onChannelClick(channel._id)}
								key={channel._id}
							>
								{channel.name}
							</CommandItem>
						))}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Members">
						{members?.map((member) => (
							<CommandItem
								onSelect={() => onMemberClick(member._id)}
								key={member._id}
							>
								{member.user.name}
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
			<div className="ml-auto flex-1 flex items-center justify-end">
				{/* <Button variant="transparent" size="iconSm">
					<Info className="size-5 text-white" />
				</Button> */}
				<ThemeToggle />
			</div>
		</nav>
	);
};

export default Toolbar;
