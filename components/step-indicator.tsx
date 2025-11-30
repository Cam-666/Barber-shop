interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between max-w-2xl mx-auto">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center flex-1">
          {/* Circle */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
              index < currentStep
                ? "bg-primary text-primary-foreground"
                : index === currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {index < currentStep ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              index + 1
            )}
          </div>

          {/* Label */}
          <p
            className={`ml-2 text-sm font-medium hidden md:block ${
              index <= currentStep ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {step}
          </p>

          {/* Line */}
          {index < steps.length - 1 && (
            <div className={`flex-1 h-1 mx-2 md:mx-4 ${index < currentStep ? "bg-primary" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  )
}
