import ReplayIcon from "@mui/icons-material/Replay";
import SignalWifiStatusbarConnectedNoInternet4Icon from "@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4";

import { STRINGS } from "../../constants/strings";

const ErrorMessage = ({
  message,
  onRetry,
  hint = STRINGS.common.errorHint,
}) => {
  return (
    <div className="py-12 text-center flex flex-col items-center gap-4">
      <div className="text-6xl">
        <SignalWifiStatusbarConnectedNoInternet4Icon
          className="text-primary-container"
          sx={{
            fontSize: "2.25rem",
          }}
        />
      </div>
      <p className="text-red-500 text-xl font-semibold">
        {message || STRINGS.common.errorTitle}
      </p>
      {hint && <p className="text-gray-400 text-sm">{hint}</p>}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-1 cursor-pointer shadow-md transition-colors duration-300 bg-primary-container/40 text-white rounded-lg hover:bg-primary-container/50"
        >
          <ReplayIcon className="mr-1 inline-block text-on-surface" />
          {STRINGS.common.retry}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
