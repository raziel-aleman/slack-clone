import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useState } from "react";

export const useConfirm = (
	title: string,
	message: string
): [() => JSX.Element, () => Promise<unknown>] => {
	const [promise, setPromise] = useState<{
		resolve: (value: boolean) => void;
	} | null>(null);

	const confirm = () =>
		new Promise((resolve, reject) => {
			setPromise({ resolve });
		});

	const handleClose = () => {
		setPromise(null);
	};

	const handleCancel = () => {
		promise?.resolve(false);
		handleClose();
	};

	const handleConfirm = () => {
		promise?.resolve(true);
		handleClose();
	};

	const ConfirmDialog = () => (
		<Dialog open={promise !== null}>
			<DialogContent hideClose>
				<div className="fixed top-4 right-4">
					<button
						type="button"
						className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
					>
						<X size={16} onClick={handleCancel} />
					</button>
				</div>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{message}</DialogDescription>
				</DialogHeader>
				<DialogFooter className="pt-2">
					<Button onClick={handleCancel} variant="outline">
						Cancel
					</Button>
					<Button onClick={handleConfirm}>Confirm</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);

	return [ConfirmDialog, confirm];
};
