import { useEffect } from "react";
import { Card, Button, Stack } from "@mantine/core";
import {
	BookOpen,
	History,
	CreditCard,
	BarChart3,
	FileText,
} from "lucide-react";
import { Link } from "react-router";

const Menu = () => {
	useEffect(() => {
		document.title = `${import.meta.env.VITE_APP_NAME_ABBREV} | Menu`;
	}, []);

	return (
		<div className="h-full flex justify-center items-center">
			<Card padding="xl" withBorder className="w-sm">
				<Stack gap="md">
					<Button
						component={Link}
						to="/browse"
						fullWidth
						className="relative justify-center"
					>
						<BookOpen size={18} className="absolute left-4" />
						Browse
					</Button>

					<Button
						component={Link}
						to="/history"
						fullWidth
						className="relative justify-center"
					>
						<History size={18} className="absolute left-4" />
						History
					</Button>

					<Button
						component={Link}
						to="/payment"
						fullWidth
						className="relative justify-center"
					>
						<CreditCard size={18} className="absolute left-4" />
						Payment
					</Button>

					<Button
						component={Link}
						to="/report"
						fullWidth
						className="relative justify-center"
					>
						<BarChart3 size={18} className="absolute left-4" />
						Report
					</Button>

					<Button
						component={Link}
						to="/transaction"
						fullWidth
						className="relative justify-center"
					>
						<FileText size={18} className="absolute left-4" />
						Transaction
					</Button>
				</Stack>
			</Card>
		</div>
	);
};

export default Menu;
