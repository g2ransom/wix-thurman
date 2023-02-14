import React from "react";
import {
	Popover,
	Typography
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

// need to find a way to apply cursor pointer to only info icon
const styles = {
	popover: {
	  "&.MuiPopover-root": {
	    maxWidth: "75%",
	    color: "F5F5F5",
	  }
  },
	popoverTypography: {
		color: "#484848",
		fontSize: ".75em",
		fontWeight: "600",
		padding: "1em 1em 1em 1em",
	},
}

type InfoPopoverProps = {
	content: string;
}

export default function InfoPopover({ content }: InfoPopoverProps) {
	const [anchorEl, setAnchorEl] = React.useState<SVGSVGElement | null>(null);

	const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		e.stopPropagation();
		setAnchorEl(anchorEl ? null : e.currentTarget);
	}

	const handleClose = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<>
			<InfoIcon onClick={(e) => handleClick(e)} />
			<Popover
	      id={id}
	      open={open}
	      anchorEl={anchorEl}
	      onClose={handleClose}
	      anchorOrigin={{
	        vertical: "top",
	        horizontal: "left",
	      }}
	      sx={styles.popover}
	    >
				<Typography sx={styles.popoverTypography}>
					{content}
				</Typography>
			</Popover>
		</>
	);
}