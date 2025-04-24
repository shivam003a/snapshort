import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function DeleteAlertDialog({ isDelDialogShown, setIsDelDialogShown, handleDelete }) {
    return (
        <AlertDialog open={isDelDialogShown} onOpenChange={setIsDelDialogShown}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        URL and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => setIsDelDialogShown(false)}
                        className="bg-cs-green text-cs-blue-dark cursor-pointer rounded-3xl font-poppins hover:border-2 hover:border-cs-green hover:bg-cs-white"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            handleDelete();
                            setIsDelDialogShown(false)
                        }}
                        className="bg-red-500 text-cs-white cursor-pointer rounded-3xl font-poppins hover:bg-red-400"
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
