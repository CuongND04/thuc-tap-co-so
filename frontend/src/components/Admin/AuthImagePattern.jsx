import { Cat, Dog, PawPrint } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-amber-100 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[...Array(12)].map((_, i) => {
            // 3 loại dấu chân khác nhau
            const pawType = i % 3;
            const animations = [
              "animate-bounce",
              "animate-pulse",
              "animate-float",
            ];

            return (
              <div
                key={i}
                className="aspect-square flex items-center justify-center"
              >
                {pawType === 0 && (
                  <Cat
                    className={` lucide lucide-cat-icon lucide-cat w-10 h-10 text-blue-400/50 ${
                      animations[i % 3]
                    }`}
                  />
                  // <svg
                  //   className={` lucide lucide-cat-icon lucide-cat w-10 h-10 text-blue-400/50 ${
                  //     animations[i % 3]
                  //   }`}
                  //   xmlns="http://www.w3.org/2000/svg"
                  //   width="24"
                  //   height="24"
                  //   viewBox="0 0 24 24"
                  //   fill="none"
                  //   stroke="currentColor"
                  //   stroke-width="2"
                  //   stroke-linecap="round"
                  //   stroke-linejoin="round"
                  // >
                  //   <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
                  //   <path d="M8 14v.5" />
                  //   <path d="M16 14v.5" />
                  //   <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
                  // </svg>
                )}

                {pawType === 1 && (
                  <Dog
                    className={`lucide lucide-dog-icon lucide-dog w-10 h-10 text-blue-500/40 ${
                      animations[i % 3]
                    }`}
                  />
                  // <svg
                  //   className={`lucide lucide-dog-icon lucide-dog w-10 h-10 text-blue-500/40 ${
                  //     animations[i % 3]
                  //   }`}
                  //   xmlns="http://www.w3.org/2000/svg"
                  //   width="24"
                  //   height="24"
                  //   viewBox="0 0 24 24"
                  //   fill="none"
                  //   stroke="currentColor"
                  //   stroke-width="2"
                  //   stroke-linecap="round"
                  //   stroke-linejoin="round"
                  // >
                  //   <path d="M11.25 16.25h1.5L12 17z" />
                  //   <path d="M16 14v.5" />
                  //   <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309" />
                  //   <path d="M8 14v.5" />
                  //   <path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
                  // </svg>
                )}

                {pawType === 2 && (
                  <PawPrint
                    className={`lucide lucide-paw-print-icon lucide-paw-print w-8 h-8 text-blue-600/30 ${
                      animations[i % 3]
                    }`}
                  />
                  // <svg
                  //   className={`lucide lucide-paw-print-icon lucide-paw-print w-8 h-8 text-blue-600/30 ${
                  //     animations[i % 3]
                  //   }`}
                  //   xmlns="http://www.w3.org/2000/svg"
                  //   width="24"
                  //   height="24"
                  //   viewBox="0 0 24 24"
                  //   fill="none"
                  //   stroke="currentColor"
                  //   stroke-width="2"
                  //   stroke-linecap="round"
                  //   stroke-linejoin="round"
                  // >
                  //   <circle cx="11" cy="4" r="2" />
                  //   <circle cx="18" cy="8" r="2" />
                  //   <circle cx="20" cy="16" r="2" />
                  //   <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
                  // </svg>
                )}
              </div>
            );
          })}
        </div>
        <h2 className="text-xl font-bold mb-4 text-amber-900">{title}</h2>
        <p className="text-amber-800/70">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
