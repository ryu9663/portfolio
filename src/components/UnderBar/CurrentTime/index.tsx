import { useCurrentTime } from '@/utils/hooks/useCurrentTime';

interface CurrentTimeProps {
  className?: string;
}
export const CurrentTime = ({ className }: CurrentTimeProps) => {
  const currentTime = useCurrentTime();
  return <div className={className}>{currentTime}</div>;
};
