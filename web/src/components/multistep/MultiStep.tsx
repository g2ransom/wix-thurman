import React, { Dispatch, SetStateAction } from "react";
import { 
	Box,
	Button,
	Paper, 
	Step, 
	StepLabel, 
	Stepper,
	Typography 
} from "@mui/material";

const styles = {
	buttonBox: {
		display: "flex",
		justifyContent: "space-between", 
		flexDirection: 'row', 
		pt: 2
	},
	paper: {
    position: "absolute",
    maxWidth: 325,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
    	xs: "75%", 
    	sm: "75%", 
    	md: "50%"
    },
    padding: "1em 1em 1.85em 1.85em",
	},
}

type MultiStepProps = {
	steps: string[];
	activeStep: number;
	setActiveStep: Dispatch<SetStateAction<number>>;
	conditions: boolean[];
	children?: 
		| React.ReactChild 
		| React.ReactChild[];
}

export default function MultiStep({ steps, activeStep, setActiveStep, conditions, children }: MultiStepProps) {
	// const [activeStep, setActiveStep] = useState<number>(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<Box>
			<Paper elevation={1} sx={styles.paper}>
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						return (
							<Step key={index}>
								<StepLabel>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				{children}
				{activeStep === steps.length ? (
					<>
						<Typography>You're done!</Typography>
					</>
				): (
					<Box sx={styles.buttonBox}>
						<Button
							disabled={activeStep === 0}
							onClick={handleBack}
						>
							Back
						</Button>
						<Button 
							onClick={handleNext}
							disabled={!conditions[activeStep]}
						>
							{activeStep === steps.length - 1 ? "Finish" : "Next"}
						</Button>
					</Box>
				)}
			</Paper>
		</Box>
	);
}