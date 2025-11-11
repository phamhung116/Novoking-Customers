import React from 'react';
import { styles } from '../utils/styles';

interface BookingStepperProps {
    steps: string[];
    currentStep: number;
}

// --- SVG Icon Components ---
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);


const BookingStepper: React.FC<BookingStepperProps> = ({ steps, currentStep }) => {
    return (
        <div style={styles.stepperContainer}>
            {steps.map((label, index) => {
                const isCompleted = index + 1 < currentStep;
                const isActive = index + 1 === currentStep;
                return (
                    <React.Fragment key={label}>
                        <div style={{ ...styles.step}}>
                            <div style={{
                                ...styles.stepCircle,
                                ...(isActive ? styles.stepCircleActive : {}),
                                ...(isCompleted ? styles.stepCircleCompleted : {})
                            }}>
                                {isCompleted ? <CheckIcon /> : index + 1}
                            </div>
                            <span style={{
                                ...styles.stepLabel,
                                ...(isActive || isCompleted ? styles.stepLabelActive : {})
                            }}>
                                {label}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div style={{
                               ...styles.stepperLine,
                               ...(isCompleted ? styles.stepperLineCompleted : {})
                            }}></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default BookingStepper;