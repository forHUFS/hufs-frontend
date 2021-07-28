import useUserInfo from './useUserInfo';
import majorCategory from '../views/MajorPage/majorCategory.json';
export default function useMajorCheck(match) {
  const { user } = useUserInfo();
  const isMajorBoard = match.url.substring(1, 6) === 'major';
  const allMajorList = majorCategory.map((c) => c.전공.flat());
  // const majorAuthenticated = [
  //   user?.MainMajor.name,
  //   user?.DoubleMajor.name,
  // ].includes(match.params.title);
  // getDepartmentMajorList('LD학부', 'LT학부');
  const x = majorCategory
    .map((c) =>
      c.전공.filter((e) => {
        if (e === user?.FirstMajor.name || e === user?.SecondMajor.name) {
          return c.단과대학;
        } else return;
      }),
    )
    .flat();
  return {
    notMyMajor: isMajorBoard === true && majorAuthenticated === false,
    isMajorBoard: isMajorBoard,
  };
}

function majorAuthenticated(majorName1, majorName2) {
  // const list = majorCategory.filter(
  //   (c) => c.단과대학 === department1 || c.단과대학 === department2,
  // );
  // console.log(list);
}
