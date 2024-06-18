const convertNameToPathSVG = (nameSVG) => {
  const tech = new String(nameSVG);
  const lowerCase = tech.toLowerCase();
  const splited = lowerCase.split(' ');
  const pathToDirectorySVGS = '/technologies_logo/';
  const fotmatFile = '.svg';
  const svgName = splited.join('-');
  return `${pathToDirectorySVGS}${svgName}${fotmatFile}`;
};

export default convertNameToPathSVG;