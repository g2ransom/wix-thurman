import React, { useState } from "react";
import {
	Box,
	Typography
} from "@mui/material";
import MultiStep from "../components/multistep/MultiStep";
import Welcome from "../components/onboarding/Welcome";

const steps = ["one", "two", "three"];
const conditions = [true, true, true];

export default function Onboarding() {
		const [activeStep, setActiveStep] = useState<number>(0);

	return (
		<MultiStep 
			steps={steps} 
			activeStep={activeStep}
			setActiveStep={setActiveStep}
			conditions={conditions}
		>
			<Box>
			{activeStep === 0 && <Welcome />}
			{activeStep === 1 && <Typography>
				Step Two Content
			</Typography>
			}
			{activeStep === 2 && <Typography>
				Step Three Content
			</Typography>
			}
			</Box>
		</MultiStep>
	);
}