import useUserInfo from './useUserInfo';

export default function useMajorCheck(match) {
  const { user } = useUserInfo();

  const isMajorBoard = match.url.substring(1, 6) === 'major';
  const majorAuthenticated = [
    user?.DoubleMajor.name,
    user?.MainMajor.name,
  ].includes(match.params.title);

  return {
    notMyMajor: isMajorBoard === true && majorAuthenticated === false,
    isMajorBoard: isMajorBoard,
  };
}
