const HowItWorks = () => {
  const steps = [
      { step: "1", title: "Tell Us How You Feel", description: "Describe your symptoms or health concerns." },
      { step: "2", title: "Let AI Analyze", description: "Our AI processes your input with your health history." },
      { step: "3", title: "Receive Guidance", description: "Get personalized advice and next steps." },
    ];

    return (
      <div className="py-20 bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How MediHelp+ Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default HowItWorks
