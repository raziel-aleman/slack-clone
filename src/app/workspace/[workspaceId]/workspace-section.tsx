import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { FaCaretRight } from "react-icons/fa";
import { useToggle } from "react-use";

interface WorkspaceSectionProps {
	children: React.ReactNode;
	label: string;
	hint: string;
	onNew?: () => void;
}

export const WorkspaceSection = ({
	children,
	label,
	hint,
	onNew,
}: WorkspaceSectionProps) => {
	const [on, toggle] = useToggle(true);

	return (
		<div className="flex flex-col mt-3 px-2">
			<div className="flex items-center px-3.5 group">
				<Button
					variant="transparent"
					className="dark:hover:bg-accent/30 p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6"
					onClick={toggle}
				>
					<FaCaretRight
						className={cn(
							"size-4 transition-transform",
							on && "rotate-90"
						)}
					/>
				</Button>
				<Button
					variant="transparent"
					size="sm"
					className="dark:hover:bg-accent/30 group px-1.5 text-sm text-[#f9edffcc] h-[28px] justify-start overflow-hidden items-center"
				>
					<span className="truncate">{label}</span>
				</Button>
				{onNew && (
					<Hint label={hint} side="top" align="center">
						<Button
							onClick={onNew}
							variant="transparent"
							size="iconSm"
							className="dark:hover:bg-accent/30 opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#f9edffcc] size-6 shrink-0"
						>
							<PlusIcon className="size-5" />
						</Button>
					</Hint>
				)}
			</div>
			{on && children}
		</div>
	);
};
