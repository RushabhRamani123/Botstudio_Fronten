import { 
    User, 
    Bell, 
    Circle, 
    Users, 
    Star, 
    LifeBuoy, 
    Globe,
    House,
    Mail ,
    MessagesSquare,
    BotMessageSquareIcon,
    Unplug,
    ChartColumnIncreasing,
    Cog,
    BellIcon,
    MessageCircleQuestion,
    List,
    X,
    Clock,
    MessageSquare,
    GitBranch,
    UserPlus,
    Tag,
    Zap,
    HelpCircle,
    MessageCircle, 
    LayoutTemplate,
    CalendarDays
  } from 'lucide-react';
  const onSetSubscribe=()=>{}
  const onSetUnSubscribe=()=>{}
  const onSetUpdateAttribute=()=>{}
  const onSetAssignTeam=()=>{}
  const onSetAssignAgent=()=>{}
  const onSetNewFlow=()=>{}
  const onSetTemplate=()=>{}
  const onSetTimeDelay=()=>{}
  const onSetTags=()=>{}
  const onSetUpdateChatStatus=()=>{}
  const onAddList=()=>{}

const conversations = [
    { Icon: User, label: 'You', count: 5 },
    { Icon: Bell, label: 'Mentions', count: 2 },
    { Icon: Circle, label: 'All', count: 234 },
    { Icon: Users, label: 'Unassigned', count: 20 },
    { Icon: Star, label: 'Sales', count: 142 },
    { Icon: LifeBuoy, label: 'Support', count: 4 },
    { Icon: Globe, label: 'Global Sales', count: 23 },
  ];
  const navItems = [
    { icon: House, label: 'Home', path: '/' },
    { icon: MessagesSquare, label: 'Messages', path: '/messages', badge: 12 },
    { icon: BotMessageSquareIcon, label: 'Bot', path: '/bot' },
    { icon : LayoutTemplate , label:'Template',path:'/template'},
    { icon: Mail , label: 'Mail', path: '/mail' },
    { icon: CalendarDays, label: 'Calendar', path: '/calendar' },
    { icon: Bell, label: 'Notifications', badge: 12, path: '/notifications' },
    { icon: Unplug, label: 'Integration', path: '/integration' },
    { icon: ChartColumnIncreasing, label: 'Analytics', path: '/analytics' },
    { 
      icon: Cog, 
      label: 'Settings', 
      subItems: [
        { icon: User, label: 'Account', path: '/settings/account' },
        { icon: Lock, label: 'Privacy', path: '/settings/privacy' },
        { icon: Globe, label: 'Language', path: '/settings/language' },
        { icon: BellIcon, label: 'Notifications', path: '/settings/notifications' }
      ]
    },
    { icon: MessageCircleQuestion, label: 'Help', path: '/help' },
  ];
  const Chats = [
    {
      dateSeparator: "MONDAY",
      text: "How do you decide on the pricing, I mean what is your definition of people?",
      sender: 'bot',
      timestamp: '10:18',
      isNote: false
    },
    {
      text: "Project Map typically replies in under 2h.",
      sender: 'employee',
      timestamp: '10:20',
      isNote: false
    },
    {
      text: "Good question! People means the users/customers and leads you store in the database but you can have as many agents as you'd like.",
      sender: 'employee',
      timestamp: '10:22',
      isNote: false
    },
    {
      dateSeparator: "YESTERDAY",
      text: "Exactly, and pricing is based on the number of 'people' you manage in the employee.",
      sender: 'bot',
      timestamp: '16:09',
      isNote: false
    },
    {
      text: "That helps, thanks!",
      sender: 'user',
      timestamp: '16:10',
      isNote: false
    },
    {
      text: "Glad we could clarify that for you! Let us know if you have any other questions.",
      sender: 'employee',
      timestamp: '16:12',
      isNote: false
    },
    {
      dateSeparator: "TODAY",
      text: "You're welcome! I can also provide you with more details on the pricing tiers if you'd like.",
      sender: 'bot',
      timestamp: '21:01',
      isNote: false
    },
    {
      text: "This man is interested for this product",
      sender: 'employee',
      timestamp: '21:01',
      isNote: true
    }
  ]
  const countryCodes = [
    { code: '+1', country: '🇺🇸 United States' },
    { code: '+44', country: '🇬🇧 United Kingdom' },
    { code: '+91', country: '🇮🇳 India' },
    { code: '+86', country: '🇨🇳 China' },
    { code: '+81', country: '🇯🇵 Japan' },
    { code: '+49', country: '🇩🇪 Germany' },
    { code: '+33', country: '🇫🇷 France' },
    { code: '+39', country: '🇮🇹 Italy' },
    { code: '+7', country: '🇷🇺 Russia' },
    { code: '+55', country: '🇧🇷 Brazil' },
    { code: '+52', country: '🇲🇽 Mexico' },
    { code: '+34', country: '🇪🇸 Spain' },
    { code: '+61', country: '🇦🇺 Australia' },
    { code: '+1', country: '🇨🇦 Canada' },
    { code: '+82', country: '🇰🇷 South Korea' },
    { code: '+31', country: '🇳🇱 Netherlands' },
    { code: '+90', country: '🇹🇷 Turkey' },
    { code: '+46', country: '🇸🇪 Sweden' },
    { code: '+41', country: '🇨🇭 Switzerland' },
    { code: '+65', country: '🇸🇬 Singapore' },
    { code: '+27', country: '🇿🇦 South Africa' },
    { code: '+54', country: '🇦🇷 Argentina' },
    { code: '+20', country: '🇪🇬 Egypt' },
    { code: '+66', country: '🇹🇭 Thailand' },
    { code: '+92', country: '🇵🇰 Pakistan' },
    { code: '+62', country: '🇮🇩 Indonesia' },
    { code: '+84', country: '🇻🇳 Vietnam' },
    { code: '+60', country: '🇲🇾 Malaysia' },
    { code: '+63', country: '🇵🇭 Philippines' },
    { code: '+64', country: '🇳🇿 New Zealand' },
    { code: '+43', country: '🇦🇹 Austria' },
    { code: '+32', country: '🇧🇪 Belgium' },
    { code: '+45', country: '🇩🇰 Denmark' },
    { code: '+358', country: '🇫🇮 Finland' },
    { code: '+30', country: '🇬🇷 Greece' },
    { code: '+353', country: '🇮🇪 Ireland' },
    { code: '+972', country: '🇮🇱 Israel' },
    { code: '+47', country: '🇳🇴 Norway' },
    { code: '+351', country: '🇵🇹 Portugal' },
    { code: '+48', country: '🇵🇱 Poland' },
    { code: '+40', country: '🇷🇴 Romania' },
    { code: '+36', country: '🇭🇺 Hungary' },
    { code: '+420', country: '🇨🇿 Czech Republic' },
    { code: '+56', country: '🇨🇱 Chile' },
    { code: '+57', country: '🇨🇴 Colombia' },
    { code: '+58', country: '🇻🇪 Venezuela' },
    { code: '+51', country: '🇵🇪 Peru' },
    { code: '+971', country: '🇦🇪 United Arab Emirates' },
    { code: '+966', country: '🇸🇦 Saudi Arabia' },
    { code: '+98', country: '🇮🇷 Iran' },
    { code: '+880', country: '🇧🇩 Bangladesh' },
    { code: '+234', country: '🇳🇬 Nigeria' },
    { code: '+254', country: '🇰🇪 Kenya' },
    { code: '+380', country: '🇺🇦 Ukraine' },
    { code: '+359', country: '🇧🇬 Bulgaria' },
    { code: '+385', country: '🇭🇷 Croatia' },
    { code: '+381', country: '🇷🇸 Serbia' },
    { code: '+352', country: '🇱🇺 Luxembourg' },
    { code: '+356', country: '🇲🇹 Malta' },
    { code: '+354', country: '🇮🇸 Iceland' },
    { code: '+371', country: '🇱🇻 Latvia' },
    { code: '+370', country: '🇱🇹 Lithuania' },
    { code: '+372', country: '🇪🇪 Estonia' },
    { code: '+373', country: '🇲🇩 Moldova' },
    { code: '+377', country: '🇲🇨 Monaco' },
    { code: '+376', country: '🇦🇩 Andorra' },
    { code: '+423', country: '🇱🇮 Liechtenstein' },
    { code: '+386', country: '🇸🇮 Slovenia' },
    { code: '+421', country: '🇸🇰 Slovakia' },
    { code: '+598', country: '🇺🇾 Uruguay' },
    { code: '+593', country: '🇪🇨 Ecuador' },
    { code: '+503', country: '🇸🇻 El Salvador' },
    { code: '+502', country: '🇬🇹 Guatemala' },
    { code: '+504', country: '🇭🇳 Honduras' },
    { code: '+506', country: '🇨🇷 Costa Rica' },
    { code: '+507', country: '🇵🇦 Panama' },
    { code: '+595', country: '🇵🇾 Paraguay' },
    { code: '+591', country: '🇧🇴 Bolivia' },
    { code: '+962', country: '🇯🇴 Jordan' },
    { code: '+961', country: '🇱🇧 Lebanon' },
    { code: '+968', country: '🇴🇲 Oman' },
    { code: '+974', country: '🇶🇦 Qatar' },
    { code: '+965', country: '🇰🇼 Kuwait' },
    { code: '+973', country: '🇧🇭 Bahrain' },
    { code: '+994', country: '🇦🇿 Azerbaijan' },
    { code: '+995', country: '🇬🇪 Georgia' },
    { code: '+993', country: '🇹🇲 Turkmenistan' },
    { code: '+998', country: '🇺🇿 Uzbekistan' },
    { code: '+996', country: '🇰🇬 Kyrgyzstan' },
    { code: '+977', country: '🇳🇵 Nepal' },
    { code: '+94', country: '🇱🇰 Sri Lanka' },
    { code: '+95', country: '🇲🇲 Myanmar' },
    { code: '+855', country: '🇰🇭 Cambodia' },
    { code: '+856', country: '🇱🇦 Laos' },
    { code: '+976', country: '🇲🇳 Mongolia' },
    { code: '+850', country: '🇰🇵 North Korea' },
    { code: '+853', country: '🇲🇴 Macau' },
    { code: '+852', country: '🇭🇰 Hong Kong' },
    { code: '+886', country: '🇹🇼 Taiwan' },
    { code: '+673', country: '🇧🇳 Brunei' },
    { code: '+670', country: '🇹🇱 East Timor' },
    { code: '+675', country: '🇵🇬 Papua New Guinea' },
    { code: '+679', country: '🇫🇯 Fiji' },
    { code: '+687', country: '🇳🇨 New Caledonia' },
    { code: '+689', country: '🇵🇫 French Polynesia' },
  ];
  const nodeTypes = {
    // ... (keep the existing nodeTypes object)
    ListNode: { name: 'List', icon: List },
    ButtonsNode: { name: 'Buttons', icon: X },
    TimeDelayNode: { name: 'Time Delay', icon: Clock },
    TemplateNode: { name: 'Template', icon: File },
    UpdateChatStatusNode: { name: 'Update Chat Status', icon: MessageSquare },
    NewFlowNode: { name: 'New Flow', icon: GitBranch },
    AssignAgentNode: { name: 'Assign Agent', icon: Users },
    AssignTeamNode: { name: 'Assign Team', icon: UserPlus },
    TagsNode: { name: 'Tags', icon: Tag },
    UpdateAttributeNode: { name: 'Update Attribute', icon: X },
    UnSubscriptionNode: { name: 'Unsubscribe', icon: Zap },
    SubscriptionNode: { name: 'Subscribe', icon: Bell },
    AddConditionNode: { name: 'Add Condition', icon: GitBranch },
    QuestionNode: { name: 'Question', icon: HelpCircle },
    SendMessageNode: { name: 'Send Message', icon: MessageCircle},
  };
  const Operations = [
    {
      title: 'Subscribe',
      icon: (
        <svg
          width={26}
          height={26}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.3244 15.6756L21.125 13.4761V10.5625C21.1225 8.54899 20.3735 6.60794 19.0228 5.11467C17.6721 3.62141 15.8157 2.68201 13.8125 2.47812V0.8125H12.1875V2.47812C10.1843 2.68201 8.32793 3.62141 6.97724 5.11467C5.62654 6.60794 4.87752 8.54899 4.875 10.5625V13.4761L2.67556 15.6756C2.52318 15.8279 2.43755 16.0345 2.4375 16.25V18.6875C2.4375 18.903 2.5231 19.1097 2.67548 19.262C2.82785 19.4144 3.03451 19.5 3.25 19.5H8.9375V20.3125C8.9375 21.3899 9.36551 22.4233 10.1274 23.1851C10.8892 23.947 11.9226 24.375 13 24.375C14.0774 24.375 15.1108 23.947 15.8726 23.1851C16.6345 22.4233 17.0625 21.3899 17.0625 20.3125V19.5H22.75C22.9655 19.5 23.1722 19.4144 23.3245 19.262C23.4769 19.1097 23.5625 18.903 23.5625 18.6875V16.25C23.5625 16.0345 23.4768 15.8279 23.3244 15.6756ZM15.4375 20.3125C15.4375 20.959 15.1807 21.579 14.7236 22.0361C14.2665 22.4932 13.6465 22.75 13 22.75C12.3535 22.75 11.7335 22.4932 11.2764 22.0361C10.8193 21.579 10.5625 20.959 10.5625 20.3125V19.5H15.4375V20.3125Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="3.25"
              y1="0.812499"
              x2="23.5625"
              y2="24.375"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFC691" />
              <stop offset={1} stopColor="#E79110" />
            </linearGradient>
          </defs>
        </svg>
      ),
      action: () => {
        onSetSubscribe();
      },
 nodeTypes : '3',     
    },
    {
      title: 'Unsubscribe',
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.125 13.476v-2.913a8.745 8.745 0 00-.883-3.656l4.133-4.133-1.149-1.149L1.625 23.226l1.149 1.149 4.875-4.875h1.289v.813a4.063 4.063 0 008.125 0v-.813h5.687c.215 0 .422-.085.575-.238a.813.813 0 00.237-.574V16.25a.813.813 0 00-.237-.574l-2.2-2.2zm-5.688 6.837a2.438 2.438 0 01-4.875 0v-.813h4.875v.813z" fill="url(#unsubscribe_gradient_1)"/>
  <path d="M17.558 3.85a8.753 8.753 0 00-3.745-1.372V.813h-1.626v1.665a8.753 8.753 0 00-7.31 8.085v2.913l-2.2 2.2a.813.813 0 00-.237.574v2.438c0 .08.016.16.048.235L17.558 3.85z" fill="url(#unsubscribe_gradient_2)"/>
  <defs>
    <linearGradient id="unsubscribe_gradient_1" x1="2.5" y1="1.625" x2="21.688" y2="26.452" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FFC691"/>
      <stop offset="1" stopColor="#E79110"/>
    </linearGradient>
    <linearGradient id="unsubscribe_gradient_2" x1="3.019" y1="0.813" x2="18.757" y2="17.813" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FFC691"/>
      <stop offset="1" stopColor="#E79110"/>
    </linearGradient>
  </defs>
</svg>
      ),
      action: () => {
        onSetUnSubscribe();
      },
      nodeTypes : '4',
    },
    {
      title: 'Update Attribute',
      icon: (
        <svg
          width={26}
          height={26}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.5389 3.05469H14.8386C13.1979 3.05469 11.6203 3.76866 10.5265 5.02351L3.98483 12.5094C2.61759 14.0671 2.6807 16.447 4.13207 17.9182L8.5493 22.4616C9.97964 23.9328 12.2934 23.9978 13.8079 22.6131L21.0858 15.8845C22.3058 14.7594 22.9999 13.1368 22.9999 11.4492V5.56439C22.9789 4.17973 21.8851 3.05469 20.5389 3.05469ZM17.2996 11.2761C16.0165 11.2761 14.9858 10.216 14.9858 8.89625C14.9858 7.57649 16.0165 6.51635 17.2996 6.51635C18.5827 6.51635 19.6134 7.57649 19.6134 8.89625C19.6134 10.216 18.5827 11.2761 17.2996 11.2761Z"
            fill="url(#paint0_linear2)"
          />
          <defs>
            <linearGradient
              id="paint0_linear2"
              x1={13}
              y1="3.05469"
              x2={13}
              y2="23.6099"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FA9066" />
              <stop offset={1} stopColor="#B9491E" />
            </linearGradient>
          </defs>
        </svg>
      ),
      action: () => {
        onSetUpdateAttribute();
      },
      nodeTypes : '5',
    },
    {
      title: 'Set tags',
      icon: (
        <svg
          width={26}
          height={26}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.875 23.5625C17.875 23.778 17.7894 23.9847 17.6371 24.1371C17.4847 24.2894 17.278 24.375 17.0625 24.375H8.93753C8.72204 24.375 8.51538 24.2894 8.36301 24.1371C8.21064 23.9847 8.12503 23.778 8.12503 23.5625C8.12503 23.3471 8.21064 23.1404 8.36301 22.988C8.51538 22.8356 8.72204 22.75 8.93753 22.75H17.0625C17.278 22.75 17.4847 22.8356 17.6371 22.988C17.7894 23.1404 17.875 23.3471 17.875 23.5625ZM21.9375 10.5625C21.941 11.917 21.6351 13.2544 21.0429 14.4725C20.4508 15.6907 19.5881 16.7575 18.5209 17.5915C18.3216 17.7442 18.1598 17.9404 18.0479 18.1651C17.9359 18.3898 17.8768 18.6372 17.875 18.8882V19.5C17.8745 19.9309 17.7032 20.3439 17.3985 20.6486C17.0939 20.9532 16.6809 21.1246 16.25 21.125H9.75003C9.3192 21.1246 8.90616 20.9532 8.60152 20.6486C8.29688 20.3439 8.12552 19.9309 8.12503 19.5V18.8875C8.12474 18.6391 8.06757 18.3941 7.95791 18.1712C7.84825 17.9483 7.68901 17.7535 7.4924 17.6017C6.42823 16.7731 5.56645 15.7133 4.97225 14.5025C4.37806 13.2916 4.06701 11.9616 4.06263 10.6128C4.03603 5.77215 7.94882 1.74133 12.785 1.62758C13.9765 1.59893 15.1616 1.80885 16.2707 2.24499C17.3798 2.68113 18.3905 3.33469 19.2433 4.16721C20.0961 4.99974 20.7738 5.99441 21.2365 7.09271C21.6992 8.19101 21.9375 9.37076 21.9375 10.5625ZM18.6075 9.60826C18.4102 8.44788 17.8568 7.37762 17.024 6.54584C16.1912 5.71406 15.1202 5.16195 13.9596 4.96605C13.8538 4.94692 13.7452 4.94899 13.6402 4.97214C13.5352 4.99528 13.4359 5.03904 13.3479 5.10086C13.2599 5.16269 13.1851 5.24137 13.1278 5.33233C13.0704 5.42329 13.0317 5.52473 13.0139 5.63076C12.996 5.73679 12.9994 5.84531 13.0238 5.95003C13.0482 6.05475 13.0932 6.15358 13.1561 6.24079C13.2189 6.32801 13.2985 6.40188 13.3902 6.45811C13.4818 6.51435 13.5837 6.55183 13.6899 6.5684C14.5178 6.70816 15.2817 7.10199 15.8758 7.69531C16.4698 8.28862 16.8646 9.05204 17.0054 9.87974C17.0374 10.0688 17.1353 10.2405 17.2818 10.3643C17.4282 10.4882 17.6137 10.5563 17.8055 10.5566C17.8513 10.5565 17.8971 10.5527 17.9423 10.5451C18.1547 10.5091 18.3441 10.3901 18.4689 10.2144C18.5936 10.0387 18.6435 9.82071 18.6075 9.60826Z"
            fill="url(#paint0_linear8)"
          />
          <defs>
            <linearGradient
              id="paint0_linear8"
              x1="3.99982"
              y1={2}
              x2="21.9998"
              y2={24}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F8EA6E" />
              <stop offset={1} stopColor="#E6D32A" />
            </linearGradient>
          </defs>
        </svg>
      ),
      action: () => {
        onSetTags();
      },
      nodeTypes : '6',
    },
    {
      title: 'Assign Team',
      icon: (
        <svg
          width={26}
          height={26}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.75 8.54351C5.75 6.21865 7.65279 4.33398 10 4.33398C12.3472 4.33398 14.25 6.21865 14.25 8.54351C14.25 10.8684 12.3472 12.753 10 12.753C7.65279 12.753 5.75 10.8684 5.75 8.54351Z"
            fill="url(#paint0_linear3)"
          />
          <path
            d="M7.31383 14.654L7.49193 14.6258C9.15346 14.3632 10.8465 14.3632 12.5081 14.6258L12.6862 14.654C15.0273 15.024 16.75 17.0242 16.75 19.3724C16.75 20.6399 15.7127 21.6673 14.433 21.6673H5.56697C4.28734 21.6673 3.25 20.6399 3.25 19.3724C3.25 17.0242 4.97267 15.024 7.31383 14.654Z"
            fill="url(#paint1_linear3)"
          />
          <path
            d="M16 4.33398C15.5858 4.33398 15.25 4.66657 15.25 5.07684C15.25 5.48711 15.5858 5.8197 16 5.8197C17.5188 5.8197 18.75 7.03919 18.75 8.54351C18.75 10.0478 17.5188 11.2673 16 11.2673C15.5858 11.2673 15.25 11.5999 15.25 12.0102C15.25 12.4204 15.5858 12.753 16 12.753C18.3472 12.753 20.25 10.8684 20.25 8.54351C20.25 6.21865 18.3472 4.33398 16 4.33398Z"
            fill="url(#paint2_linear3)"
          />
          <path
            d="M17.2412 14.6165C16.827 14.6165 16.4912 14.9491 16.4912 15.3594C16.4912 15.7696 16.827 16.1022 17.2412 16.1022H18.2093C18.2898 16.1022 18.3704 16.1086 18.4498 16.1211C20.063 16.3761 21.25 17.7544 21.25 19.3724C21.25 19.8193 20.8842 20.1816 20.433 20.1816H18.3899C17.9757 20.1816 17.6399 20.5142 17.6399 20.9245C17.6399 21.3347 17.9757 21.6673 18.3899 21.6673H20.433C21.7127 21.6673 22.75 20.6399 22.75 19.3724C22.75 17.0242 21.0273 15.024 18.6862 14.654C18.5285 14.629 18.3689 14.6165 18.2093 14.6165H17.2412Z"
            fill="url(#paint3_linear3)"
          />
          <defs>
            <linearGradient
              id="paint0_linear3"
              x1={13}
              y1="4.33398"
              x2={13}
              y2="21.6673"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8C94FF" />
              <stop offset={1} stopColor="#4B55DD" />
            </linearGradient>
            <linearGradient
              id="paint1_linear3"
              x1={13}
              y1="4.33398"
              x2={13}
              y2="21.6673"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8C94FF" />
              <stop offset={1} stopColor="#4B55DD" />
            </linearGradient>
            <linearGradient
              id="paint2_linear3"
              x1={13}
              y1="4.33398"
              x2={13}
              y2="21.6673"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8C94FF" />
              <stop offset={1} stopColor="#4B55DD" />
            </linearGradient>
            <linearGradient
              id="paint3_linear3"
              x1={13}
              y1="4.33398"
              x2={13}
              y2="21.6673"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8C94FF" />
              <stop offset={1} stopColor="#4B55DD" />
            </linearGradient>
          </defs>
        </svg>
      ),
      action: () => {
        onSetAssignTeam();
      },
      nodeTypes : '7',
    },
    {
      title: 'Assign Agent',
      icon: (
        <svg
          width={26}
          height={26}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.7714 3.25C8.15597 3.25 6.03571 5.37025 6.03571 7.98571C6.03571 10.6012 8.15597 12.7214 10.7714 12.7214C13.3869 12.7214 15.5071 10.6012 15.5071 7.98571C15.5071 5.37025 13.3869 3.25 10.7714 3.25Z"
            fill="url(#paint0_linear4)"
          />
          <path
            d="M13.5661 14.8283C11.7147 14.5328 9.82815 14.5328 7.97672 14.8283L7.77827 14.86C5.16955 15.2763 3.25 17.5265 3.25 20.1682C3.25 21.5941 4.4059 22.75 5.83176 22.75H15.7111C17.137 22.75 18.2929 21.5941 18.2929 20.1682C18.2929 17.5265 16.3733 15.2763 13.7646 14.86L13.5661 14.8283Z"
            fill="url(#paint1_linear4)"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.6857 9.93571C20.1473 9.93571 20.5214 10.3099 20.5214 10.7714V12.1643H21.9143C22.3758 12.1643 22.75 12.5384 22.75 13C22.75 13.4616 22.3758 13.8357 21.9143 13.8357H20.5214V15.2286C20.5214 15.6901 20.1473 16.0643 19.6857 16.0643C19.2242 16.0643 18.85 15.6901 18.85 15.2286V13.8357H17.4571C16.9956 13.8357 16.6214 13.4616 16.6214 13C16.6214 12.5384 16.9956 12.1643 17.4571 12.1643H18.85V10.7714C18.85 10.3099 19.2242 9.93571 19.6857 9.93571Z"
            fill="url(#paint2_linear4)"
          />
          <defs>
            <linearGradient
              id="paint0_linear4"
              x1={13}
              y1="3.25"
              x2={13}
              y2="22.75"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#74EBA2" />
              <stop offset={1} stopColor="#31CF6E" />
            </linearGradient>
            <linearGradient
              id="paint1_linear4"
              x1={13}
              y1="3.25"
              x2={13}
              y2="22.75"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#74EBA2" />
              <stop offset={1} stopColor="#31CF6E" />
            </linearGradient>
            <linearGradient
              id="paint2_linear4"
              x1={13}
              y1="3.25"
              x2={13}
              y2="22.75"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#74EBA2" />
              <stop offset={1} stopColor="#31CF6E" />
            </linearGradient>
          </defs>
        </svg>
      ),
      action: () => {
        onSetAssignAgent();
      },
      nodeTypes : '8',
    },
    {
      title: 'Invoke New Flow',
      icon: (
        <svg
          width={26}
          height={26}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.75 5.6875C9.75 5.04103 10.0068 4.42105 10.4639 3.96393C10.921 3.50681 11.541 3.25 12.1875 3.25H13.8125C14.459 3.25 15.079 3.50681 15.5361 3.96393C15.9932 4.42105 16.25 5.04103 16.25 5.6875V7.3125C16.25 7.95897 15.9932 8.57895 15.5361 9.03607C15.079 9.49319 14.459 9.75 13.8125 9.75V11.375H17.875C18.0905 11.375 18.2972 11.4606 18.4495 11.613C18.6019 11.7653 18.6875 11.972 18.6875 12.1875V13.8125C18.6875 14.028 18.6019 14.2347 18.4495 14.387C18.2972 14.5394 18.0905 14.625 17.875 14.625C17.6595 14.625 17.4528 14.5394 17.3005 14.387C17.1481 14.2347 17.0625 14.028 17.0625 13.8125V13H8.9375V13.8125C8.9375 14.028 8.8519 14.2347 8.69952 14.387C8.54715 14.5394 8.34049 14.625 8.125 14.625C7.90951 14.625 7.70285 14.5394 7.55048 14.387C7.3981 14.2347 7.3125 14.028 7.3125 13.8125V12.1875C7.3125 11.972 7.3981 11.7653 7.55048 11.613C7.70285 11.4606 7.90951 11.375 8.125 11.375H12.1875V9.75C11.541 9.75 10.921 9.49319 10.4639 9.03607C10.0068 8.57895 9.75 7.95897 9.75 7.3125V5.6875ZM4.875 18.6875C4.875 18.041 5.13181 17.421 5.58893 16.9639C6.04605 16.5068 6.66603 16.25 7.3125 16.25H8.9375C9.58397 16.25 10.204 16.5068 10.6611 16.9639C11.1182 17.421 11.375 18.041 11.375 18.6875V20.3125C11.375 20.959 11.1182 21.579 10.6611 22.0361C10.204 22.4932 9.58397 22.75 8.9375 22.75H7.3125C6.66603 22.75 6.04605 22.4932 5.58893 22.0361C5.13181 21.579 4.875 20.959 4.875 20.3125V18.6875ZM14.625 18.6875C14.625 18.041 14.8818 17.421 15.3389 16.9639C15.796 16.5068 16.416 16.25 17.0625 16.25H18.6875C19.334 16.25 19.954 16.5068 20.4111 16.9639C20.8682 17.421 21.125 18.041 21.125 18.6875V20.3125C21.125 20.959 20.8682 21.579 20.4111 22.0361C19.954 22.4932 19.334 22.75 18.6875 22.75H17.0625C16.416 22.75 15.796 22.4932 15.3389 22.0361C14.8818 21.579 14.625 20.959 14.625 20.3125V18.6875Z"
            fill="url(#paint0_linear7)"
          />
          <defs>
            <linearGradient
              id="paint0_linear7"
              x1={13}
              y1="3.25"
              x2={13}
              y2="22.75"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#73BFFF" />
              <stop offset={1} stopColor="#1685E1" />
            </linearGradient>
          </defs>
        </svg>
      ),
      action: () => {
        onSetNewFlow();
      },
      nodeTypes : '9',
    },
    {
      title: 'Update Chat Status',
      icon: (
        <svg
          width={26}
          height={26}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.07017 9.21146C5.72287 6.42889 7.89553 4.25623 10.6781 3.60353C12.6876 3.13216 14.779 3.13216 16.7885 3.60353C19.5711 4.25623 21.7438 6.42889 22.3965 9.21147C22.8678 11.221 22.8678 13.3124 22.3965 15.3219C21.7438 18.1045 19.5711 20.2771 16.7885 20.9298C14.779 21.4012 12.6876 21.4012 10.6781 20.9298C9.99798 20.7703 9.35429 20.52 8.76033 20.1921C8.65744 21.622 7.46484 22.75 6.00877 22.75C4.48514 22.75 3.25 21.5149 3.25 19.9912C3.25 18.5352 4.37805 17.3426 5.8079 17.2397C5.48004 16.6457 5.2297 16.002 5.07017 15.3219C4.59879 13.3124 4.59879 11.221 5.07017 9.21146ZM9.20894 10.6115C9.20894 10.2458 9.50537 9.94935 9.87104 9.94935H13.1816C13.5472 9.94935 13.8437 10.2458 13.8437 10.6115C13.8437 10.9771 13.5472 11.2736 13.1816 11.2736H9.87104C9.50537 11.2736 9.20894 10.9771 9.20894 10.6115ZM10.9746 13.2599C10.6089 13.2599 10.3124 13.5563 10.3124 13.922C10.3124 14.2876 10.6089 14.5841 10.9746 14.5841H16.4921C16.8578 14.5841 17.1542 14.2876 17.1542 13.922C17.1542 13.5563 16.8578 13.2599 16.4921 13.2599H10.9746Z"
            fill="url(#paint0_linear6)"
          />
          <defs>
            <linearGradient
              id="paint0_linear6"
              x1={13}
              y1="3.25"
              x2={13}
              y2="22.75"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FD919C" />
              <stop offset={1} stopColor="#D81F31" />
            </linearGradient>
          </defs>
        </svg>
      ),
      action: () => {
        onSetUpdateChatStatus();
      },
      nodeTypes : '10',
    },
    {
      title: 'Template',
      icon: (
        <svg
          width={26}
          height={26}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.78223 3.6226C11.8987 3.1258 14.1013 3.1258 16.2178 3.6226C19.1001 4.29918 21.3866 6.46155 22.2391 9.2708H3.76095C4.61338 6.46155 6.89991 4.29918 9.78223 3.6226Z"
            fill="url(#paint0_linear5)"
          />
          <path
            d="M3.47157 10.5161C3.13237 12.4075 3.18263 14.351 3.62234 16.2269C4.33929 19.2855 6.72579 21.6737 9.78223 22.3912C10.6371 22.5918 11.5061 22.7114 12.3778 22.75V10.5161H3.47157Z"
            fill="url(#paint1_linear5)"
          />
          <path
            d="M13.6222 22.75C14.4939 22.7114 15.3629 22.5918 16.2178 22.3912C19.2742 21.6737 21.6607 19.2855 22.3777 16.2269C22.8174 14.351 22.8676 12.4075 22.5284 10.5161H13.6222V22.75Z"
            fill="url(#paint2_linear5)"
          />
          <defs>
            <linearGradient
              id="paint0_linear5"
              x1={13}
              y1="3.25"
              x2={13}
              y2="22.75"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D896FF" />
              <stop offset="0.0001" stopColor="#D896FF" />
              <stop offset={1} stopColor="#A135DF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear5"
              x1={13}
              y1="3.25"
              x2={13}
              y2="22.75"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D896FF" />
              <stop offset="0.0001" stopColor="#D896FF" />
              <stop offset={1} stopColor="#A135DF" />
            </linearGradient>
            <linearGradient
              id="paint2_linear5"
              x1={13}
              y1="3.25"
              x2={13}
              y2="22.75"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D896FF" />
              <stop offset="0.0001" stopColor="#D896FF" />
              <stop offset={1} stopColor="#A135DF" />
            </linearGradient>
          </defs>
        </svg>
      ),
      action: () => {
        onSetTemplate();
      },
      nodeTypes : '11',
    },
    {
      title: 'Time Delay',
      icon: (
        <svg
          width={26}
          height={26}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 23.8334C7.02 23.8334 2.16666 18.9909 2.16666 13.0001C2.16666 7.02005 7.02 2.16672 13 2.16672C18.9908 2.16672 23.8333 7.02005 23.8333 13.0001C23.8333 18.9909 18.9908 23.8334 13 23.8334ZM16.4558 17.0191C16.5858 17.095 16.7267 17.1383 16.8783 17.1383C17.1492 17.1383 17.42 16.9975 17.5717 16.7375C17.7992 16.3583 17.68 15.86 17.29 15.6216L13.4333 13.325V8.31998C13.4333 7.86498 13.065 7.50748 12.6208 7.50748C12.1767 7.50748 11.8083 7.86498 11.8083 8.31998V13.7908C11.8083 14.0725 11.96 14.3325 12.2092 14.4841L16.4558 17.0191Z"
            fill="url(#paint0_linear9)"
          />
          <defs>
            <linearGradient
              id="paint0_linear9"
              x1={13}
              y1="2.16672"
              x2={13}
              y2="23.8334"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#97FFFF" />
              <stop offset={1} stopColor="#01A5A5" />
            </linearGradient>
          </defs>
        </svg>
      ),
      action: () => {
        onSetTimeDelay();
      },
      nodeTypes : '12',
    },
    
  ];
  const ASKQUESTION = [
    {
      mainBackgroundColor: '#ff9933',
      subBackgroundColor: '#ffb062',
      mainText: 'Question',
      subText: 'Ask a question',
      actionType:'1',
      icon: (
        <svg
          width={26}
          height={26}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.85 24.7C20.4015 24.7 21.8895 24.0837 22.9866 22.9866C24.0837 21.8895 24.7 20.4015 24.7 18.85C24.7 17.2985 24.0837 15.8105 22.9866 14.7134C21.8895 13.6163 20.4015 13 18.85 13C17.2985 13 15.8105 13.6163 14.7134 14.7134C13.6163 15.8105 13 17.2985 13 18.85C13 20.4015 13.6163 21.8895 14.7134 22.9866C15.8105 24.0837 17.2985 24.7 18.85 24.7ZM19.6612 22.1065C19.6656 22.2158 19.6478 22.325 19.609 22.4273C19.5702 22.5296 19.5111 22.623 19.4352 22.7019C19.3594 22.7808 19.2685 22.8436 19.1678 22.8865C19.0671 22.9294 18.9588 22.9515 18.8493 22.9515C18.7399 22.9515 18.6316 22.9294 18.5309 22.8865C18.4302 22.8436 18.3393 22.7808 18.2635 22.7019C18.1876 22.623 18.1285 22.5296 18.0897 22.4273C18.0509 22.325 18.0331 22.2158 18.0375 22.1065C18.0375 21.891 18.1231 21.6843 18.2755 21.532C18.4278 21.3796 18.6345 21.294 18.85 21.294C19.0655 21.294 19.2722 21.3796 19.4245 21.532C19.5769 21.6843 19.6625 21.891 19.6625 22.1065H19.6612ZM21.2602 17.4889C21.2602 18.2507 20.9807 18.6693 20.3138 19.2036L19.9537 19.4818C19.6339 19.734 19.526 19.8718 19.5039 20.0642L19.4896 20.267C19.4607 20.4268 19.3729 20.57 19.2437 20.6684C19.1144 20.7668 18.953 20.8132 18.7913 20.7985C18.6295 20.7839 18.4791 20.7092 18.3697 20.5891C18.2602 20.4691 18.1997 20.3124 18.2 20.15C18.2 19.409 18.473 19.0008 19.1308 18.4756L19.4922 18.1961C19.8666 17.8971 19.9602 17.7515 19.9602 17.4889C19.9602 16.7635 19.4636 16.2539 18.85 16.2539C18.2078 16.2539 17.7333 16.7297 17.7398 17.4824C17.7407 17.5678 17.7247 17.6525 17.6928 17.7316C17.6609 17.8108 17.6138 17.883 17.554 17.9439C17.4943 18.0049 17.4231 18.0535 17.3445 18.0869C17.266 18.1204 17.1817 18.138 17.0963 18.1389C17.0109 18.1398 16.9262 18.1238 16.8471 18.0919C16.7679 18.06 16.6957 18.0129 16.6348 17.9531C16.5738 17.8934 16.5252 17.8222 16.4918 17.7436C16.4583 17.6651 16.4407 17.5808 16.4398 17.4954C16.4268 16.0173 17.4876 14.9539 18.85 14.9539C20.1903 14.9539 21.2589 16.0537 21.2589 17.4889H21.2602Z"
            fill="white"
          />
          <path
            d="M11.7 2.59961C10.3209 2.59961 8.99823 3.14746 8.02304 4.12265C7.04786 5.09784 6.5 6.42048 6.5 7.79961C6.5 9.17873 7.04786 10.5014 8.02304 11.4766C8.99823 12.4518 10.3209 12.9996 11.7 12.9996C13.0791 12.9996 14.4018 12.4518 15.377 11.4766C16.3521 10.5014 16.9 9.17873 16.9 7.79961C16.9 6.42048 16.3521 5.09784 15.377 4.12265C14.4018 3.14746 13.0791 2.59961 11.7 2.59961Z"
            fill="white"
          />
          <path
            d="M5.21131 14.2988C4.86894 14.2975 4.52966 14.3637 4.21294 14.4937C3.89622 14.6238 3.60828 14.8151 3.36565 15.0566C3.12301 15.2982 2.93044 15.5852 2.79899 15.9014C2.66753 16.2175 2.59978 16.5565 2.59961 16.8988C2.59961 19.0971 3.68251 20.7547 5.37511 21.835C7.04171 22.8971 9.28811 23.3988 11.6996 23.3988C12.2326 23.3988 12.7604 23.3742 13.2726 23.3248C12.252 22.0565 11.6968 20.4768 11.6996 18.8488C11.6996 17.1198 12.3132 15.5338 13.3337 14.2988H5.21261H5.21131Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      mainBackgroundColor: '#ff9933',
      subBackgroundColor: '#ffb062',
      mainText: 'Buttons',
      subText: 'Choices based on buttons (Maximum of 3 choices)',
      actionType:'13',
      icon: (
        <svg
          width={26}
          height={26}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.0003 2.16602C7.02033 2.16602 2.16699 7.01935 2.16699 12.9993C2.16699 18.9793 7.02033 23.8327 13.0003 23.8327C18.9803 23.8327 23.8337 18.9793 23.8337 12.9993C23.8337 7.01935 18.9803 2.16602 13.0003 2.16602ZM13.0003 21.666C8.21199 21.666 4.33366 17.7877 4.33366 12.9993C4.33366 8.21102 8.21199 4.33268 13.0003 4.33268C17.7887 4.33268 21.667 8.21102 21.667 12.9993C21.667 17.7877 17.7887 21.666 13.0003 21.666Z"
            fill="white"
          />
          <path
            d="M12.9997 18.4173C15.9912 18.4173 18.4163 15.9922 18.4163 13.0007C18.4163 10.0091 15.9912 7.58398 12.9997 7.58398C10.0081 7.58398 7.58301 10.0091 7.58301 13.0007C7.58301 15.9922 10.0081 18.4173 12.9997 18.4173Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      mainBackgroundColor: '#ff9933',
      subBackgroundColor: '#ffb062',
      mainText: 'List',
      subText: 'Choices based on buttons (Maximum of 10 choices)',
      actionType:'14',
      action: () => onAddList(),
      icon: (
        <svg
          width={26}
          height={26}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.79199 5.95833L5.41699 7.58333L8.12533 4.875"
            stroke="white"
            strokeWidth="2.16667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.79199 12.4583L5.41699 14.0833L8.12533 11.375"
            stroke="white"
            strokeWidth="2.16667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.79199 18.9583L5.41699 20.5833L8.12533 17.875"
            stroke="white"
            strokeWidth="2.16667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.917 6.5H21.667"
            stroke="white"
            strokeWidth="2.16667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.917 13H21.667"
            stroke="white"
            strokeWidth="2.16667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.917 19.5H21.667"
            stroke="white"
            strokeWidth="2.16667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];
  const stepColor = [
    {
      mainBackgroundColor: '#e95b69',
      subBackgroundColor: '#ee7d88',
      mainText: 'Send a message',
      subText: 'With no response required from visitor',
      actionType:'0',
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.0939 3.60187C6.871 4.3305 4.34214 6.80736 3.56626 9.99529C3.142 11.7385 3.14588 13.5727 3.57014 15.3159C4.35814 18.5537 6.67613 21.2483 9.78568 22.5039L9.92122 22.5586C11.2668 23.1019 12.8083 22.4476 13.3605 21.1143C13.5124 20.7474 13.8743 20.504 14.2741 20.504H15.4915C18.8028 20.504 21.6833 18.2541 22.4605 15.0606C22.8465 13.4747 22.8465 11.8205 22.4605 10.2347L22.3586 9.81595C21.6095 6.73788 19.1678 4.34638 16.0559 3.64286L15.6188 3.54403C13.8847 3.15199 12.0839 3.15199 10.3498 3.54403L10.0939 3.60187ZM9.21044 9.06391C8.79359 9.06391 8.45568 9.39918 8.45568 9.81275C8.45568 10.2263 8.79359 10.5616 9.21044 10.5616H16.1291C16.546 10.5616 16.8839 10.2263 16.8839 9.81275C16.8839 9.39918 16.546 9.06391 16.1291 9.06391H9.21044ZM10.4684 12.8081C10.0515 12.8081 9.71362 13.1434 9.71362 13.5569C9.71362 13.9705 10.0515 14.3058 10.4684 14.3058H14.8712C15.288 14.3058 15.6259 13.9705 15.6259 13.5569C15.6259 13.1434 15.288 12.8081 14.8712 12.8081H10.4684Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      mainBackgroundColor: '#ff9933',
      subBackgroundColor: '#ffb062',
      mainText: 'Ask a question',
      subText: 'Ask question and store user input in variable',
     
      actionType:'-1',
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.62234 9.78223C3.12589 11.8987 3.12589 14.1013 3.62234 16.2178C4.33929 19.2742 6.72578 21.6607 9.78222 22.3777C11.8987 22.8741 14.1013 22.8741 16.2178 22.3777C19.2742 21.6607 21.6607 19.2742 22.3777 16.2178C22.8741 14.1013 22.8741 11.8987 22.3777 9.78223C21.6607 6.72578 19.2742 4.33928 16.2178 3.62234C14.1013 3.12589 11.8987 3.12589 9.78223 3.62234C6.72578 4.33928 4.33928 6.72578 3.62234 9.78223ZM13.8296 16.4742C13.8296 16.9038 13.4814 17.252 13.0518 17.252C12.6222 17.252 12.274 16.9038 12.274 16.4742C12.274 16.0447 12.6222 15.6964 13.0518 15.6964C13.4814 15.6964 13.8296 16.0447 13.8296 16.4742ZM11.5481 10.8222C11.5481 10.0204 12.1981 9.37035 13 9.37035C13.8018 9.37035 14.4519 10.0204 14.4519 10.8222V10.9481C14.4519 11.3665 14.2856 11.7678 13.9898 12.0637L12.56 13.4934C12.317 13.7364 12.317 14.1304 12.56 14.3734C12.803 14.6164 13.197 14.6164 13.44 14.3734L14.8697 12.9436C15.399 12.4144 15.6963 11.6965 15.6963 10.9481V10.8222C15.6963 9.33308 14.4891 8.12588 13 8.12588C11.5108 8.12588 10.3036 9.33308 10.3036 10.8222V11.3408C10.3036 11.6844 10.5822 11.963 10.9259 11.963C11.2695 11.963 11.5481 11.6844 11.5481 11.3408V10.8222Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      mainBackgroundColor: '#6c7ed6',
      subBackgroundColor: '#8796e0',
      mainText: 'Set a condition',
      subText: 'Send message(s) based on logical condition(s)',
     
      actionType:'2',
      icon: (
        <svg
          width={26}
          height={26}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.6947 2.6237C23.6947 2.6237 16.2622 6.41609 12.4867 8.1894C13.2955 8.92798 14.0478 9.7246 14.8282 10.4924C10.9897 14.3821 12.9911 12.4319 9.15262 16.3215C9.4341 16.5902 9.71536 16.8587 9.99686 17.1273C13.8353 13.2376 11.834 15.1882 15.6724 11.2986C16.4543 12.0777 17.2318 12.8612 18.0139 13.6401C20.0305 9.66858 23.6947 2.6237 23.6947 2.6237V2.6237Z"
            fill="white"
          />
          <path
            d="M9.10888 21.6214L3.80789 22.4837L4.67003 17.1824L9.97105 16.3205L9.10888 21.6214Z"
            fill="white"
            stroke="white"
            strokeWidth="0.994363"
            strokeLinecap="square"
          />
        </svg>
      ),
    },
  ];
export {conversations,navItems,Chats,countryCodes,nodeTypes,Operations,ASKQUESTION,stepColor}; 