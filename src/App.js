import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Form, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { Stepper } from '@progress/kendo-react-layout';
import { AccountDetails } from './components/account-details';
import { PersonalDetails } from './components/personal-details';
import { PaymentDetails } from './components/payment-details';
import "bootstrap-icons/font/bootstrap-icons.css";
const stepPages = [AccountDetails, PersonalDetails, PaymentDetails];
 const App = () => {
  const [step, setStep] = React.useState(0);
  const [formState, setFormState] = React.useState({});
  const [steps, setSteps] = React.useState([
    {
      label: 'Contact Information',
      icon: 'bi bi-telephone',
      isValid: undefined,
    },
    {
      label: 'Mortgage Information',
      icon:'k-i-cart',
      isValid: undefined,
    },
    {
      label: 'Review the Fine Print',
      icon: 'k',
      isValid: undefined,
    },{
      label: 'Personal Information',
      isValid: undefined,
    },{
      label: 'Subject Property',
      isValid: undefined,
    },{
      label: 'Notes (Optional)',
      isValid: undefined,
    },
  ]);
  const lastStepIndex = steps.length - 1;
  const isLastStep = lastStepIndex === step;
  const onStepSubmit = React.useCallback(
    (event) => {
      const { isValid, values } = event;
      const currentSteps = steps.map((currentStep, index) => ({
        ...currentStep,
        isValid: index === step ? isValid : currentStep.isValid,
      }));
      setSteps(currentSteps);

      if (!isValid) {
        return;
      }

      setStep(() => Math.min(step + 1, lastStepIndex));
      setFormState(values);

      if (isLastStep) {
        alert(JSON.stringify(values));
      }
    },
    [steps, isLastStep, step, lastStepIndex]
  );
  const onPrevClick = React.useCallback(
    (event) => {
      event.preventDefault();
      setStep(() => Math.max(step - 1, 0));
    },
    [step, setStep]
  );
  return (
    <div className="container">
    <div className="row justify-content-center">
     
      <div className="col-md-4">
      <div className="card">
        <div className='card-body'>
            <Stepper
          orientation="vertical"
          
          value={step}
          items={steps}
        />
        </div>
      </div>
      
      </div>
      <div className="col-md-8">
        <div className='card'>
        <i class="bi bi-telephone"></i>
        <div className='card-body'>
        <Form
          initialValues={formState}
          onSubmitClick={onStepSubmit}
          render={(formRenderProps) => (
            <div
              style={{
                alignSelf: 'center',
              }}
            >
              <FormElement
                style={{
                  width: 480,
                }}
              >
                {stepPages[step]}
                <span
                  style={{
                    marginTop: '40px',
                  }}
                  className={'k-form-separator'}
                />
                <div
                  style={{
                    justifyContent: 'space-between',
                    alignContent: 'center',
                  }}
                  className={'k-form-buttons k-buttons-end'}
                >
                  <span
                    style={{
                      alignSelf: 'center',
                    }}
                  >
                    Step {step + 1} of 3
                  </span>
                  <div>
                    {step !== 0 ? (
                      <Button
                        style={{
                          marginRight: '16px',
                        }}
                        onClick={onPrevClick}
                      >
                        Previous
                      </Button>
                    ) : undefined}
                    <Button
                      primary={true}
                      disabled={!formRenderProps.allowSubmit}
                      onClick={formRenderProps.onSubmit}
                    >
                      {isLastStep ? 'Submit' : 'Next'}
                    </Button>
                  </div>
                </div>
              </FormElement>
            </div>
          )}
        /></div></div>
      </div>
    </div></div>
  );
};

export default App;