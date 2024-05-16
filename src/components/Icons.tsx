interface IconProps {
  width?: number
  height?: number
  className?: string
}

export const HairIcon: React.FC<IconProps> = ({ width = 24, height = 24, className }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path
        fill="#fff"
        d="M15.636 3c-1.577 0-3.264.131-4.917.379-.321.016-7.895.501-10.507 10.645-.649 2.529.358 7.823 1.103 9.749.263.679.732 2.131 1.355 4.2A1.43 1.43 0 0 0 4.047 29a1.442 1.442 0 0 0 1.434-1.532c-.141-2.34-.107-5.616.849-7.92.019-.043.049-.151.062-.196a59.78 59.78 0 0 0 .733-2.961c.4.28.78.568 1.174.867 2.084 1.582 4.239 3.217 10.092 4.338.062.012.216.027.279.027.625 0 1.175-.408 1.372-1.014.069-.213.088-.432.062-.643.906.533 1.766.985 2.448 1.214a1.468 1.468 0 0 0 1.862-1.005c1.331.99 2.562 2.603 2.634 5.195.001.033.008.106.012.139l.294 2.151A1.55 1.55 0 0 0 28.878 29c.729 0 1.347-.5 1.503-1.218.536-2.467.931-4.158 1.114-4.764 1.436-4.802-.403-12.772-2.758-14.843C28.11 7.252 24.722 3 15.636 3zM29.58 22.442c-.123.405-.313 1.168-.567 2.278-.269-3.091-1.971-5.576-4.842-7.036a1.46 1.46 0 0 0-.664-.162c-.611 0-1.16.4-1.367.996-.03.086-.052.174-.066.262-.985-.52-2.193-1.287-3.224-1.941a69.687 69.687 0 0 0-1.613-1.005c-.776-.461-1.822-.061-2.119.785a1.456 1.456 0 0 0 .475 1.635c.246.197.646.545 1.066.913-3.825-.976-5.448-2.208-7.152-3.501-.616-.467-1.252-.951-1.992-1.416a1.448 1.448 0 0 0-.771-.224c-.714 0-1.318.516-1.437 1.228-.203 1.221-.78 3.333-.843 3.564l-.006.024c-.608 1.501-.889 3.287-.99 5.012a20.939 20.939 0 0 0-.289-.802c-.729-1.886-1.512-6.653-1.03-8.528 2.23-8.664 8.411-9.13 8.764-9.155A32.461 32.461 0 0 1 15.636 5c8.741 0 11.378 4.18 11.482 4.351.065.112.152.21.254.289 1.665 1.277 3.45 8.646 2.208 12.802z"
      ></path>
    </svg>
  )
}

export const MouthIcon: React.FC<IconProps> = ({ width = 24, height = 24, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 48 48"
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M24 14.1818C15.2 10.2545 7 18.5453 4 24C7 28.3636 15.2 36 24 36C32.8 36 41 28.3636 44 24C41 18.5454 33 9.81822 24 14.1818ZM41.6044 23.8759C40.1404 21.5563 37.8704 18.8812 35.1456 17.0765C32.0369 15.0175 28.5484 14.1992 24.8725 15.9814C24.3415 16.2389 23.7239 16.2487 23.1849 16.0081C19.5922 14.4048 16.066 15.2261 12.9057 17.2555C10.1567 19.0209 7.8594 21.6083 6.39928 23.8805C7.87025 25.7409 10.1705 28.0471 12.9679 29.9951C16.3101 32.3223 20.1618 34 24 34C27.8382 34 31.6899 32.3223 35.0321 29.9951C37.8319 28.0455 40.1336 25.737 41.6044 23.8759Z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M12.5552 23.9581C15.6832 24.9918 19.7444 26 24 26C28.1964 26 32.2037 24.9628 35.3345 23.9229C32.1553 22.912 28.0661 22 24 22C19.8856 22 15.7482 22.9338 12.5552 23.9581ZM9.03371 23.0988C12.4476 21.7291 18.2022 20 24 20C29.7006 20 35.3594 21.6717 38.7926 23.0297C39.6211 23.3574 39.5703 24.5234 38.736 24.8357C35.4141 26.079 29.9194 28 24 28C17.9609 28 12.3638 26.1057 9.0651 24.8259C8.26067 24.5138 8.23291 23.4201 9.03371 23.0988Z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export const EyeIcon: React.FC<IconProps> = ({ width = 24, height = 24, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={width}
      height={height}
      className={className}
    >
      <path
        fill="#fff"
        d="M25 39c13.036 0 23.352-12.833 23.784-13.379l.491-.621-.491-.621C48.352 23.833 38.036 11 25 11S1.648 23.833 1.216 24.379L.725 25l.491.621C1.648 26.167 11.964 39 25 39zm0-26c10.494 0 19.47 9.46 21.69 12C44.473 27.542 35.509 37 25 37 14.506 37 5.53 27.54 3.31 25 5.527 22.458 14.491 13 25 13z"
      ></path>
      <path
        fill="#fff"
        d="M25 34c4.963 0 9-4.038 9-9s-4.037-9-9-9-9 4.038-9 9 4.037 9 9 9zm0-16c3.859 0 7 3.14 7 7s-3.141 7-7 7-7-3.14-7-7 3.141-7 7-7z"
      ></path>
    </svg>
  )
}

export const GlassIcon: React.FC<IconProps> = ({ width = 24, height = 24, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
    >
      <path
        fill="#fff"
        d="M10,15.4157v2.5843c0,1.1046-.8954,2-2,2H4c-1.1046,0-2-.8954-2-2v-4c2.3013-.869,4.975-.3482,7.3404,.4738,.3983,.1384,.6596,.5204,.6596,.942Zm4.6596-.942c-.3983,.1384-.6596,.5204-.6596,.942v2.5843c0,1.1046,.8954,2,2,2h4c1.1046,0,2-.8954,2-2v-4c-2.3013-.869-4.975-.3482-7.3404,.4738Z"
      ></path>
      <path
        fill="#fff"
        d="M22.479,13.8564l-2.5723-8.5747c-.3198-1.0659-1.2822-1.7817-2.395-1.7817h-1.5117c-.2764,0-.5,.2236-.5,.5s.2236,.5,.5,.5h1.5117c.6675,0,1.2451,.4297,1.437,1.0688l2.3076,7.6923c-1.865-.4301-4.0867-.1882-6.7607,.7404h-.0005c-.5952,.207-.9951,.7754-.9951,1.4141v.4293c-.8721-.6442-2.1279-.6442-3,0v-.4293c0-.6387-.3999-1.207-.9951-1.4141h-.0005c-2.6736-.9299-4.8951-1.1709-6.7607-.7404l2.3076-7.6922c.1919-.6392,.7695-1.0688,1.437-1.0688h1.5117c.2764,0,.5-.2236,.5-.5s-.2236-.5-.5-.5h-1.5117c-1.1128,0-2.0752,.7158-2.395,1.7817L1.521,13.8564c-.0109,.0362-.0074,.072-.0099,.1082-.001,.0128-.011,.0224-.011,.0353v4c0,1.3784,1.1216,2.5,2.5,2.5h4c1.3784,0,2.5-1.1216,2.5-2.5v-.793l.4395-.4395c.585-.585,1.5361-.585,2.1211,0l.4395,.4395v.793c0,1.3784,1.1216,2.5,2.5,2.5h4c1.3784,0,2.5-1.1216,2.5-2.5v-4c0-.0129-.0101-.0226-.011-.0353-.0026-.0362,.0009-.072-.0099-.1082Zm-12.979,4.1436c0,.8271-.6729,1.5-1.5,1.5H4c-.8271,0-1.5-.6729-1.5-1.5v-3.644c1.7603-.5513,3.9487-.3574,6.6763,.5898,.1938,.0679,.3237,.2563,.3237,.4697v2.5845Zm12,0c0,.8271-.6729,1.5-1.5,1.5h-4c-.8271,0-1.5-.6729-1.5-1.5v-2.5845c0-.2134,.1299-.4019,.3237-.4697,2.7285-.9473,4.9165-1.1406,6.6763-.5898v3.644Z"
      ></path>
    </svg>
  )
}

export const HandIcon: React.FC<IconProps> = ({ width = 24, height = 24, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={width}
      height={height}
      className={className}
    >
      <path
        fill="#fff"
        d="M60.707 3.293a1 1 0 0 0-1.117-.205L48.973 7.866a.974.974 0 0 0-.267.185c-.009.008-.021.011-.03.02L45.451 11.3l-5.391 5.38.56-6.13c.01-.1.02-.21.02-.32a3.334 3.334 0 0 0-6.61-.61l-1.18 6.31-.16-2.41a.984.984 0 0 0-1.06-.93 1 1 0 0 0-.93 1.06l.67 10.37a.975.975 0 0 0 .53.82.934.934 0 0 0 .41.12.991.991 0 0 0 1.04-.82l.17-.92 2.47-13.23a1.337 1.337 0 0 1 2.65.24c0 .04-.01.07-.01.13l-.77 8.53-.28 3.11-.45 4.95a.809.809 0 0 0 0 .22l.49 3.64.33 2.49.38 2.8a1 1 0 0 0 .72.84 1.025 1.025 0 0 0 1.05-.34l3.94-4.95a6.73 6.73 0 0 1 3.68-2.33q.315-.075.63-.12l1.37-.18a3.489 3.489 0 0 1 2.22.43l-4.92 4.2a8.814 8.814 0 0 0-2.35 3.16l-1.45 3.27a7.692 7.692 0 0 1-1.29 2l-2.2 2.47a.995.995 0 0 0 .75 1.66.981.981 0 0 0 .74-.33l2.2-2.46a9.686 9.686 0 0 0 1.63-2.53l1.45-3.27a6.779 6.779 0 0 1 1.82-2.45l5.49-4.69a1.4 1.4 0 0 0 .5-1.07 1.383 1.383 0 0 0-.48-1.04 5.449 5.449 0 0 0-4.37-1.33l-1.38.18q-.4.06-.81.15a8.684 8.684 0 0 0-4.79 3.03L40 33.51l-.27-1.99 11.432-11.432.012-.008 4.756-4.755c.008-.009.011-.021.019-.03a1 1 0 0 0 .186-.267L60.912 4.41a1 1 0 0 0-.205-1.117zm-11.325 6.9 4.426 4.426-3.341 3.341-4.426-4.426zm5.524 2.694L51.115 9.1l4.333-1.95 1.407 1.408zM39.4 29.03l-.27-2.02.65-7.22 4.845-4.845 4.43 4.43zm-28.12-2.11a9.867 9.867 0 0 1 .08 1.22c0 .18 0 .36-.01.53l-.03.46a.99.99 0 0 0 .93 1.06.17.17 0 0 0 .07.01 1 1 0 0 0 .99-.94l.03-.46c.02-.22.02-.44.02-.66a9.591 9.591 0 0 0-.11-1.51l-1.54-10.55a.875.875 0 0 1-.02-.16 1.146 1.146 0 0 1 2.24-.34l3.3 10.56a1 1 0 0 0 1.95-.34l-.64-16.4a1.193 1.193 0 0 1 2.36-.24l3.14 14.9a1 1 0 0 0 1.05.8 1.017 1.017 0 0 0 .93-.93l.02-.33v-.01l1.25-17.22a1.473 1.473 0 0 1 2.94.01l.15 2.28a1 1 0 1 0 1.99-.13l-.15-2.28a3.473 3.473 0 0 0-6.93-.03l-.76 10.48-1.67-7.95a3.194 3.194 0 0 0-6.32.65c0 .02.01.11.01.13l.34 8.83-1.05-3.38a3.148 3.148 0 0 0-6.15.94 3.731 3.731 0 0 0 .04.46zm25.09 21.43a10.272 10.272 0 0 0-2.02 7.68l.43 2.97H17.61l.94-4.41a10.642 10.642 0 0 0 .22-2.11 9.524 9.524 0 0 0-.32-2.5 10.071 10.071 0 0 0-.57-1.65l-2.04-4.59-.88-1.96-.5-1.13a16.232 16.232 0 0 1-1.41-6.47.972.972 0 0 0-1.01-.99 1 1 0 0 0-.99 1.01 18.221 18.221 0 0 0 1.59 7.27l3.42 7.67c.014.031.02.063.033.094l-3.648-3.648a1 1 0 0 0-1.414 0l-4.756 4.756a1 1 0 0 0-.224.357L3.86 52.89a2.933 2.933 0 0 0 0 4.15l3.1 3.1a2.933 2.933 0 0 0 4.15 0l2.19-2.192a.992.992 0 0 0 .355-.224l2.768-2.769L15.4 59.79a1.007 1.007 0 0 0 .2.84 1.022 1.022 0 0 0 .78.37h19.56a1.011 1.011 0 0 0 .76-.35.994.994 0 0 0 .23-.79l-.6-4.12a7.713 7.713 0 0 1-.08-1.18 8.2 8.2 0 0 1 1.7-4.99 1 1 0 1 0-1.58-1.22zM16.23 52.2l-3.341 3.341-4.43-4.43L11.8 47.77zM9.7 58.73a.961.961 0 0 1-1.32 0l-3.11-3.11a.938.938 0 0 1-.27-.66.956.956 0 0 1 .27-.66l1.774-1.775 4.431 4.43z"
      ></path>
      <path
        fill="#fff"
        d="M28.334 48.524h-3.088a1 1 0 0 1-1-1v-1.132a8.205 8.205 0 0 1-1.219-.507l-.8.8a1 1 0 0 1-1.414 0L18.627 44.5a1 1 0 0 1 0-1.414l.8-.8a8.205 8.205 0 0 1-.507-1.219h-1.13a1 1 0 0 1-1-1V36.98a1 1 0 0 1 1-1h1.132a8.25 8.25 0 0 1 .507-1.219l-.8-.8a1 1 0 0 1 0-1.414l2.184-2.184a1 1 0 0 1 1.414 0l.8.8a8 8 0 0 1 1.219-.507v-1.132a1 1 0 0 1 1-1 1.022 1.022 0 0 1 1.025 1 1.056 1.056 0 0 1-.025.234v1.664a1 1 0 0 1-.789.977 6.217 6.217 0 0 0-2.054.854 1 1 0 0 1-1.249-.134l-.636-.637-.77.77.637.637a1 1 0 0 1 .133 1.249 6.2 6.2 0 0 0-.853 2.053 1 1 0 0 1-.978.789h-.9v1.088h.9a1 1 0 0 1 .978.789 6.192 6.192 0 0 0 .854 2.054 1 1 0 0 1-.134 1.249l-.637.636.77.77.636-.637A1 1 0 0 1 23.4 43.8a6.215 6.215 0 0 0 2.055.855 1 1 0 0 1 .788.977v.9h1.088v-.9a1 1 0 0 1 .788-.977 6.22 6.22 0 0 0 2.054-.854 1 1 0 0 1 1.249.133l.637.637.769-.77-.637-.636a1 1 0 0 1-.133-1.249 6.249 6.249 0 0 0 .855-2.055 1 1 0 0 1 .977-.788h.9V37.98h-.9a1 1 0 0 1-.977-.788 6.235 6.235 0 0 0-.855-2.054 1 1 0 0 1 .133-1.249l.637-.637-.769-.77-.637.637a1 1 0 0 1-1.249.134 6.164 6.164 0 0 0-2-.841 1 1 0 0 1 .441-1.952 8.2 8.2 0 0 1 1.933.7l.8-.8a1 1 0 0 1 1.415 0l2.183 2.184a1 1 0 0 1 0 1.414l-.8.8a8.1 8.1 0 0 1 .507 1.219h1.138a1 1 0 0 1 1 1v3.088a1 1 0 0 1-1 1h-1.133a8.1 8.1 0 0 1-.507 1.219l.8.8a1 1 0 0 1 0 1.414l-2.183 2.184a1 1 0 0 1-1.415 0l-.8-.8a8.194 8.194 0 0 1-1.218.507v1.132a1 1 0 0 1-1 1.003Zm-1.541-5.25a4.75 4.75 0 1 1 4.674-5.6 1 1 0 1 1-1.967.358 2.75 2.75 0 1 0-2.706 3.245 2.713 2.713 0 0 0 1.116-.236 1 1 0 1 1 .815 1.826 4.7 4.7 0 0 1-1.932.407Z"
      ></path>
    </svg>
  )
}
