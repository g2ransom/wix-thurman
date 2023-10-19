import React, { Dispatch, SetStateAction } from "react";
import { 
	Box,
	Button,
	Grid,
	Hidden,
	Paper, 
	Step, 
	StepLabel, 
	Stepper,
	Typography 
} from "@mui/material";

const styles = {
	button: {
		backgroundColor: "#36454F",
		"&:hover": {
			backgroundColor: "#495D6A",
		},
		fontWeight: "800",
		marginLeft: "1.5em",
	},
	buttonBox: {
		display: "flex",
		justifyContent: "space-between", 
		flexDirection: 'row', 
		pt: 2
	},
	formPaper: {
    padding: "1em 1em 1.85em 1.85em",
	},
	multistepPaper: {
		padding: "1em 1em 1.85em 1.85em"
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

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<>
		<Grid item xs={12} sm={12} md={8} lg={8}>
			<Paper elevation={0} sx={styles.formPaper}>
				{children}
				{activeStep === steps.length ? (
					<>
						<Typography 
							variant="h4" 
							sx={{fontWeight: "bolder"}}
						>
							You're done 🎉!
						</Typography>
						<Button
							href="/"
							variant="contained"
							sx={styles.button}
						>
							Dashboard Home
						</Button>
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
		</Grid>
		<Hidden smDown>
		<Grid item md={4}>
			<Paper elevation={0}>
				<Stepper 
					activeStep={activeStep} 
					orientation="vertical"
					sx={styles.multistepPaper}
				>
					{steps.map((label, index) => {
						return (
							<Step key={index}>
								<StepLabel>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
			</Paper>
		</Grid>
		</Hidden>
		</>
	);
}