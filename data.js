/* Vy's Grammar Path – lesson data (Unit 1–4). F1 (can) belongs to Unit 3, F2 (have) to Unit 4. */
/* ---------- Lessons ----------
 Colour markup: [s:..] subject (red) · [v:..] verb (blue) · [a:..] adverb / time (green) · [j:..] adjective (yellow) · [u:..] preposition or 's (underlined)
 Levels: questions 0-4 Understand, 5-9 Use, 10-11 Challenge */
const UNITS=[
  {n:1,t:'Hello!'},{n:2,t:'My home'},{n:3,t:'My day'},{n:4,t:'People I know'}
];
const LESSONS=[
/* ================= UNIT 1 ================= */
{id:'u1l1',u:1,n:'Lesson 1',t:'Be: am, is, are',ic:'girl',
 cards:[
  {t:'am / is / are',f:'[s:I] + [v:am]|[s:He / She / It] + [v:is]|[s:You / We / They] + [v:are]',ex:['[s:I] [v:am] Vy.','[s:She] [v:is] a doctor.','[s:They] [v:are] [j:my] friends.'],trap:'Không nói *I is* hay *She are*. Chủ ngữ quyết định dùng am, is hay are.',ill:['girl','doctor','family']},
  {t:'Short forms',f:'I am → [s:I][v:\'m]|she is → [s:she][v:\'s]|they are → [s:they][v:\'re]',ex:["[s:I][v:'m] fourteen.","[s:He][v:'s] a student."],trap:"Dấu ' thay cho chữ bị bỏ: *I'm* = *I am*. Hai cách viết đều đúng.",ill:['student','boy']}
 ],
 q:[
  {t:'mc',q:'She ___ a teacher.',o:['am','is','are'],a:1,h:'Chủ ngữ là *She*. She đi với am, is hay are?',e:'He / She / It + is.',s:'[s:She] [v:is] a teacher.',i:'teacher'},
  {t:'match',m:[['I am',"I'm"],['you are',"you're"],['she is',"she's"],['they are',"they're"],['we are',"we're"]],h:"Dạng viết tắt giữ chữ đầu: *you are* → *you're*.",e:"I'm, you're, she's, they're, we're.",s:"I'm. You're. She's. They're. We're.",i:'match'},
  {t:'tf',q:'They is my friends.',a:false,h:'',e:'They đi với *are*, không đi với is.',s:'[s:They] [v:are] [j:my] friends.',i:'family'},
  {t:'tap',q:'We is students.',a:1,h:'Tìm động từ. We đi với am, is hay are?',e:'We + are.',s:'[s:We] [v:are] students.',i:'student'},
  {t:'mc',q:"A: Who's that?\nB: That ___ my brother.",o:['am','is','are'],a:1,h:'*That* là một người, giống he/she.',e:'That (một người/vật) + is.',s:'[s:That] [v:is] [j:my] brother.',i:'boy'},
  {t:'gap',q:'I ___ Vy. I ___ fourteen. My friends ___ nice.',a:[['am',"'m"],['am',"'m"],['are',"'re"]],h:'I + am. *My friends* là nhiều người.',e:'I + am; my friends (= they) + are.',s:"[s:I] [v:am] Vy. [s:I] [v:am] fourteen. [j:My] [s:friends] [v:are] [j:nice].",i:'girl'},
  {t:'order',w:['He','is','a','doctor','are'],a:'He is a doctor.',h:'Thứ tự: chủ ngữ → be → a + nghề.',e:'S + is + a + nghề nghiệp.',s:'[s:He] [v:is] a doctor.',i:'doctor'},
  {t:'write',p:'Write the short form.',q:'They are from Hanoi.',a:["They're from Hanoi."],x:true,h:"they are → they're",e:"*They are* viết tắt là *They're*.",s:"[s:They][v:'re] [u:from] Hanoi.",i:'family'},
  {t:'write',p:'Translate into English.',q:'Cô ấy là y tá.',a:['She is a nurse.'],h:'cô ấy = she; y tá = a nurse. She + ?',e:'She + is + a + nghề.',s:'[s:She] [v:is] a nurse.',i:'nurse'},
  {t:'tap',q:'My mother are a chef.',a:2,h:'*My mother* là một người, giống she.',e:'My mother (= she) + is.',s:'[j:My] [s:mother] [v:is] a chef.',i:'chef'},
  {t:'write',p:'Fix the mistakes.',q:'I is Vy and I is a student.',a:['I am Vy and I am a student.'],h:'Có hai lỗi. I đi với am.',e:'I + am, cả hai chỗ.',s:'[s:I] [v:am] Vy and [s:I] [v:am] a student.',i:'student'},
  {t:'gap',q:'Kenji and Yumi ___ from Japan. Kenji ___ fifteen and Yumi ___ thirteen.',a:[['are',"'re"],['is',"'s"],['is',"'s"]],h:'*Kenji and Yumi* = they. *Kenji* = he.',e:'Hai người + are; một người + is.',s:'[s:Kenji and Yumi] [v:are] [u:from] Japan. [s:Kenji] [v:is] fifteen and [s:Yumi] [v:is] thirteen.',i:'flag:jp'}
 ],
 sp:{t:'Introduce yourself',tpl:"Hi! [s:I][v:'m] {n}. [s:I][v:'m] {a} years old. [s:I][v:'m] a {j}.",sl:{n:['Vy','Lan','Minh'],a:['12','13','14','15'],j:['student','singer','swimmer']}}
},
{id:'u1l2',u:1,n:'Lesson 2',t:"Be: not and questions",ic:'flag:vn',
 cards:[
  {t:'Negative: not',f:"[s:I] [v:am not] = [s:I][v:'m not]|[s:He] [v:is not] = [s:He] [v:isn't]|[s:They] [v:are not] = [s:They] [v:aren't]",ex:["[s:I][v:'m not] [u:from] China.","[s:She] [v:isn't] a teacher."],trap:"Không có *amn't*. Chỉ nói *I'm not*.",ill:['flag:cn','girl']},
  {t:'Questions',f:"[v:Are] [s:you] ...?|[v:Is] [s:she] ...?",ex:["[v:Is] [s:she] [u:from] Japan? — Yes, [s:she] [v:is].","[v:Are] [s:they] [j:Italian]? — No, [s:they] [v:aren't]."],trap:"Trả lời *Yes* ngắn thì không viết tắt: *Yes, I'm.* là sai, phải là *Yes, I am.*",ill:'swap'},
  {t:'Country → nationality',f:"Japan → [j:Japanese]|Vietnam → [j:Vietnamese]|China → [j:Chinese]|Korea → [j:Korean]|France → [j:French]|Italy → [j:Italian]|Brazil → [j:Brazilian]|the USA → [j:American]",ex:["[s:I][v:'m] [u:from] Japan. [s:I][v:'m] [j:Japanese]."],trap:"*from* + tên nước. Quốc tịch thì không có from: *I'm Japanese*, không phải *I'm from Japanese*.",ill:['flag:jp','flag:vn','flag:fr','flag:br']}
 ],
 q:[
  {t:'mc',q:'___ you from Vietnam?',o:['Is','Are','Am'],a:1,h:'Câu hỏi đảo be lên đầu. *You* đi với be nào?',e:'Are + you ...?',s:'[v:Are] [s:you] [u:from] Vietnam?',i:'flag:vn'},
  {t:'mc',q:'A: Is Marco Italian?\nB: Yes, he ___.',o:['is',"'s","isn't"],a:0,h:'Yes thì không phủ định. Câu trả lời ngắn có được viết tắt không?',e:"Yes, he is. Không viết *Yes, he's.*",s:'Yes, [s:he] [v:is].',i:'flag:it'},
  {t:'match',m:[['Japan','Japanese'],['France','French'],['China','Chinese'],['the USA','American'],['Italy','Italian']],h:'Nhìn chữ đầu: Fr… đi với Fr…',e:'Japan → Japanese, France → French, China → Chinese, the USA → American, Italy → Italian.',s:'Japanese. French. Chinese. American. Italian.',i:'flag:fr'},
  {t:'tf',q:"I amn't from China.",a:false,h:'',e:"Không có *amn't*. Dùng *I'm not* hoặc *I am not*.",s:"[s:I][v:'m not] [u:from] China.",i:'flag:cn'},
  {t:'tap',q:'She is from French.',a:3,h:'Sau *from* là tên nước hay quốc tịch?',e:'from + tên nước: from France.',s:'[s:She] [v:is] [u:from] France.',i:'flag:fr'},
  {t:'write',p:'Make it negative.',q:'We are Chinese.',a:["We aren't Chinese.","We are not Chinese."],h:'Thêm *not* sau be.',e:'are + not = aren’t.',s:"[s:We] [v:aren't] [j:Chinese].",i:'flag:cn'},
  {t:'write',p:'Make a question.',q:'They are from Italy.',a:['Are they from Italy?'],h:'Đưa *are* lên trước *they*.',e:'Be + S + ...?',s:'[v:Are] [s:they] [u:from] Italy?',i:'flag:it'},
  {t:'order',w:['Is','he','American','from'],a:'Is he American?',h:'Quốc tịch không cần *from*.',e:'Is + he + quốc tịch?',s:'[v:Is] [s:he] [j:American]?',i:'flag:us'},
  {t:'gap',q:"A: ___ you from Japan?\nB: No, I'm ___. I'm from Korea. I'm ___.",a:[['Are'],['not'],['Korean']],h:'Câu hỏi với you; trả lời No; Korea → quốc tịch?',e:'Are you ...? — No, I’m not. Korea → Korean.',s:"[v:Are] [s:you] [u:from] Japan? No, [s:I][v:'m not]. [s:I][v:'m] [u:from] Korea. [s:I][v:'m] [j:Korean].",i:'flag:kr'},
  {t:'write',p:'Translate into English.',q:'Họ không phải người Pháp.',a:["They aren't French.","They are not French.","They're not French."],h:'họ = they; người Pháp = French.',e:'They + aren’t + quốc tịch.',s:"[s:They] [v:aren't] [j:French].",i:'flag:fr'},
  {t:'write',p:'Fix the mistakes.',q:"Is she from Japanese? Yes, she's.",a:['Is she Japanese? Yes, she is.','Is she from Japan? Yes, she is.'],h:'Hai lỗi: *from + quốc tịch*, và câu trả lời Yes viết tắt.',e:'Japanese không đi với from; Yes, she is.',s:'[v:Is] [s:she] [j:Japanese]? Yes, [s:she] [v:is].',i:'flag:jp'},
  {t:'gap',q:"Hi! I ___ Lucas. I'm ___. I'm from Brazil. My sister ___ not a student. She ___ a nurse.",a:[['am',"'m"],['Brazilian'],['is'],['is',"'s"]],h:'Brazil → quốc tịch? *My sister* = she.',e:'I + am; Brazil → Brazilian; she + is.',s:"Hi! [s:I] [v:am] Lucas. [s:I][v:'m] [j:Brazilian]. [j:My] [s:sister] [v:is not] a student. [s:She] [v:is] a nurse.",i:'flag:br'}
 ],
 sp:{t:'Where are you from?',tpl:"[s:I][v:'m] [u:from] {c.0}. [s:I][v:'m] [j:{c.1}]. [s:I][v:'m not] [u:from] {d}.",sl:{c:[['Vietnam','Vietnamese'],['Japan','Japanese'],['France','French'],['Italy','Italian']],d:['China','the USA','Korea']}}
},
{id:'u1l3',u:1,n:'Lesson 3',t:"my, your, his, her + 's",ic:'family',
 cards:[
  {t:'Possessive adjectives',f:'I → [j:my]|you → [j:your]|he → [j:his]|she → [j:her]|we → [j:our]|they → [j:their]',ex:['[s:This] [v:is] [j:my] brother. [j:His] [s:name] [v:is] Nam.','[s:This] [v:is] Anna. [j:Her] [s:bag] [v:is] [j:red].'],trap:'*his* = của anh ấy (nam), *her* = của cô ấy (nữ). Chọn theo người sở hữu.',ill:['boy','girl','bag']},
  {t:"Name + 's",f:"Lan[u:'s] bag = cái túi của Lan|Tom[u:'s] sister = chị/em gái của Tom",ex:["[s:Lan][u:'s] [s:bag] [v:is] [j:blue]."],trap:"Viết 's ngay sau người sở hữu: *Lan's bag*, không phải *bag Lan's*.",ill:['girl','bag']},
  {t:'Wh- questions with be',f:"What [v:is] [j:your] [s:name]?|Where [v:are] [s:you] [u:from]?|How old [v:is] [s:he]?",ex:["What[v:'s] [j:your] [s:name]? — [j:My] [s:name][v:'s] Vy."],trap:'Từ hỏi đứng đầu, be đứng trước chủ ngữ.',ill:['girl','flag:vn','cake']}
 ],
 q:[
  {t:'mc',q:'He is my brother. ___ name is Nam.',o:['His','Her','Their'],a:0,h:'Anh ấy là nam (he) → của anh ấy là gì?',e:'he → his.',s:'[j:His] [s:name] [v:is] Nam.',i:'boy'},
  {t:'mc',q:"We're in class 7A. ___ teacher is Ms Hoa.",o:['Our','Their','My'],a:0,h:'Chủ ngữ là *We* → của chúng tôi?',e:'we → our.',s:'[j:Our] [s:teacher] [v:is] Ms Hoa.',i:'teacher'},
  {t:'match',m:[['I','my'],['she','her'],['they','their'],['we','our'],['he','his']],h:'Mỗi chủ ngữ có một từ sở hữu riêng.',e:'I → my, she → her, they → their, we → our, he → his.',s:'My. Her. Their. Our. His.',i:'match'},
  {t:'tf',q:'This is Anna. His bag is red.',a:false,h:'',e:'Anna là nữ → *her*.',s:'[s:This] [v:is] Anna. [j:Her] [s:bag] [v:is] [j:red].',i:'bag'},
  {t:'tap',q:'My parents are teachers. His school is big.',a:4,h:'*My parents* là hai người → they → ?',e:'they → their.',s:'[j:My] [s:parents] [v:are] teachers. [j:Their] [s:school] [v:is] [j:big].',i:'school'},
  {t:'gap',q:"A: What's ___ name?\nB: ___ name's Vy.",a:[['your'],['My']],h:'Hỏi bạn → của bạn; trả lời về mình → của tôi.',e:'your name — my name.',s:"What[v:'s] [j:your] [s:name]? [j:My] [s:name][v:'s] Vy.",i:'girl'},
  {t:'order',w:["Mai's",'bag','is','red','Mai'],a:"Mai's bag is red.",h:"Dùng *Mai's* + đồ vật.",e:"Người + 's + đồ vật.",s:"[s:Mai][u:'s] [s:bag] [v:is] [j:red].",i:'bag'},
  {t:'write',p:"Use 's.",q:'the phone of Minh',a:["Minh's phone"],x:true,h:"Người sở hữu + 's + đồ vật.",e:"the phone of Minh = Minh's phone.",s:"Minh[u:'s] phone",i:'phone'},
  {t:'write',p:'Translate into English.',q:'Mẹ của Nam là bác sĩ.',a:["Nam's mother is a doctor.","Nam's mum is a doctor.","Nam's mom is a doctor."],h:"của Nam → Nam's.",e:"Nam's mother + is + a doctor.",s:"[s:Nam][u:'s] [s:mother] [v:is] a doctor.",i:'doctor'},
  {t:'mc',q:"A: How old ___ your sister?\nB: She's eight.",o:['is','are','am'],a:0,h:'*your sister* = she.',e:'How old + is + she?',s:'How old [v:is] [j:your] [s:sister]?',i:'cake'},
  {t:'write',p:'Fix the mistakes.',q:'Where is you from? What is you name?',a:['Where are you from? What is your name?',"Where are you from? What's your name?"],h:'Hai lỗi: be đi với you, và “của bạn”.',e:'Where are you ...? / your name.',s:'Where [v:are] [s:you] [u:from]? What [v:is] [j:your] [s:name]?',i:'flag:vn'},
  {t:'gap',q:"This is Kenji. ___ Japanese. ___ sister's name ___ Aya.",a:[["He's",'He is'],['His'],['is',"'s"]],h:'Kenji là nam. Câu 1 cần chủ ngữ + be.',e:"He's Japanese. His sister's name is Aya.",s:"[s:This] [v:is] Kenji. [s:He][v:'s] [j:Japanese]. [j:His] [s:sister][u:'s] [s:name] [v:is] Aya.",i:'flag:jp'}
 ],
 sp:{t:'My family',tpl:"[s:This] [v:is] [j:my] {p.0}. [j:{p.1}] [s:name] [v:is] {p.2}. [s:{p.3}][v:'s] {a} years old.",sl:{p:[['mother','Her','Lan','She'],['father','His','Hùng','He'],['brother','His','Nam','He'],['sister','Her','Mai','She']],a:['8','16','40','45']}}
},
/* ================= UNIT 2 ================= */
{id:'u2l1',u:2,n:'Lesson 1',t:'this, that, these, those',ic:'book',
 cards:[
  {t:'Near or far?',f:'1 thứ, gần: [s:this] [v:is]|1 thứ, xa: [s:that] [v:is]|nhiều thứ, gần: [s:these] [v:are]|nhiều thứ, xa: [s:those] [v:are]',ex:['[s:This] [v:is] [j:my] pen.','[s:Those] [v:are] [j:my] shoes.'],trap:'*these / those* đi với *are* và danh từ số nhiều.',ill:'nearfar'},
  {t:'Plural nouns',f:'book → books|box → boxes, watch → watches|city → cities|child → children',ex:['[s:These] [v:are] [j:my] books.'],trap:'Sau s, x, ch, sh thêm -es. Phụ âm + y → -ies.',ill:['book','box','watch']},
  {t:'a / an',f:'a + phụ âm: a pen, a bag|an + a, e, i, o, u: an apple, an umbrella',ex:["[s:It][v:'s] an umbrella."],trap:'Nhìn âm đầu của từ ngay sau: *an apple*, nhưng *a red apple*.',ill:['apple','umbrella']}
 ],
 q:[
  {t:'mc',q:'Look here! ___ are my books.',o:['This','These','Those'],a:1,h:'Nhiều thứ, ở gần.',e:'Gần + nhiều = these.',s:'[s:These] [v:are] [j:my] books.',i:'book'},
  {t:'match',m:[['box','boxes'],['watch','watches'],['city','cities'],['child','children'],['phone','phones']],h:'-es sau x, ch; y → ies; child là bất quy tắc.',e:'boxes, watches, cities, children, phones.',s:'Boxes. Watches. Cities. Children. Phones.',i:'box'},
  {t:'mc',q:"It's ___ umbrella.",o:['a','an'],a:1,h:'*umbrella* bắt đầu bằng âm u.',e:'an + nguyên âm.',s:"[s:It][v:'s] an umbrella.",i:'umbrella'},
  {t:'tf',q:'Those is my shoes.',a:false,h:'',e:'those + are.',s:'[s:Those] [v:are] [j:my] shoes.',i:'shoes'},
  {t:'tap',q:'These are my book.',a:3,h:'*These* là nhiều thứ → danh từ cũng phải…',e:'these + danh từ số nhiều: books.',s:'[s:These] [v:are] [j:my] books.',i:'book'},
  {t:'gap',q:"A: What's ___? (it's here)\nB: It's ___ apple.",a:[['this'],['an']],h:'Một thứ, ở gần. *apple* bắt đầu bằng a.',e:'this (gần, 1 thứ); an apple.',s:"What[v:'s] [s:this]? [s:It][v:'s] an apple.",i:'apple'},
  {t:'write',p:'Make it plural.',q:'This is a box.',a:['These are boxes.'],h:'this → these, is → are, box → ?',e:'These are boxes.',s:'[s:These] [v:are] boxes.',i:'box'},
  {t:'order',w:['Are','those','your','cameras','is'],a:'Are those your cameras?',h:'*those* đi với is hay are?',e:'Are + those + ...?',s:'[v:Are] [s:those] [j:your] cameras?',i:'camera'},
  {t:'write',p:'Make it singular.',q:'Those are my watches.',a:['That is my watch.',"That's my watch."],h:'those → that, are → is, watches → ?',e:'That is my watch.',s:'[s:That] [v:is] [j:my] watch.',i:'watch'},
  {t:'write',p:'Translate into English.',q:'Đây là những cái ghế của tôi.',a:['These are my chairs.'],h:'Đây + nhiều cái → these.',e:'These are + danh từ số nhiều.',s:'[s:These] [v:are] [j:my] chairs.',i:'chair'},
  {t:'write',p:'Fix the mistakes.',q:'This are a umbrella.',a:['This is an umbrella.'],h:'Hai lỗi: be với *this*, và a/an.',e:'This is; an umbrella.',s:'[s:This] [v:is] an umbrella.',i:'umbrella'},
  {t:'gap',q:"A: Are ___ (far away) Tom's shoes?\nB: No, they ___. ___ shoes are here.",a:[['those'],["aren't",'are not'],['His']],h:'Ở xa + nhiều đôi. Trả lời No. Tom là nam → của anh ấy?',e:'those (xa, nhiều); No, they aren’t; His shoes.',s:"[v:Are] [s:those] Tom[u:'s] shoes? No, [s:they] [v:aren't]. [j:His] [s:shoes] [v:are] here.",i:'shoes'}
 ],
 sp:{t:'My things',tpl:"[s:{o.0}] [v:{o.1}] [j:my] {o.2}. [s:{o.3}] [v:{o.4}] [j:{c}].",sl:{o:[['This','is','bag','It','is'],['These','are','books','They','are'],['That','is','phone','It','is'],['Those','are','shoes','They','are']],c:['new','big','old','nice']}}
},
{id:'u2l2',u:2,n:'Lesson 2',t:'There is, there are',ic:'sofa',
 cards:[
  {t:'There is / There are',f:'There [v:is] a [s:sofa].|There [v:are] two [s:beds].',ex:['There [v:is] a [s:lamp] [u:on] the table.','There [v:are] three [s:bedrooms].'],trap:'Danh từ phía sau (tô đỏ) quyết định dùng *is* hay *are*.',ill:['sofa','bed','lamp']},
  {t:'not and questions',f:"There [v:isn't] a [s:TV].|There [v:aren't] any [s:chairs].|[v:Is] there a [s:garden]? — Yes, there is.|[v:Are] there any [s:books]? — No, there aren't.",ex:["There [v:isn't] a [s:garden]."],trap:'Câu phủ định và câu hỏi với số nhiều dùng *any*; câu khẳng định dùng *some*.',ill:['tv','house']}
 ],
 q:[
  {t:'mc',q:'There ___ a sofa in the living room.',o:['is','are'],a:0,h:'*a sofa* là một hay nhiều?',e:'There is + a + danh từ số ít.',s:'There [v:is] a [s:sofa] [u:in] the living room.',i:'sofa'},
  {t:'mc',q:'There ___ three bedrooms.',o:['is','are'],a:1,h:'*three bedrooms* là nhiều.',e:'There are + số nhiều.',s:'There [v:are] three [s:bedrooms].',i:'bed'},
  {t:'tf',q:'There are a lamp on the table.',a:false,h:'',e:'*a lamp* là một → There is.',s:'There [v:is] a [s:lamp] [u:on] the table.',i:'lamp'},
  {t:'mc',q:'A: Is there a TV in your room?\nB: No, there ___.',o:["isn't","aren't",'is'],a:0,h:'Câu hỏi dùng *Is* → trả lời No với…',e:'Is there…? — No, there isn’t.',s:"No, there [v:isn't].",i:'tv'},
  {t:'match',m:[['There is an','armchair.'],['There are','some books.'],['Are there any','windows?'],['Is there a','garden?']],h:'Nhìn dấu ? và số ít/số nhiều.',e:'There is an armchair. There are some books. Are there any windows? Is there a garden?',s:'There is an armchair. There are some books. Are there any windows? Is there a garden?',i:'house'},
  {t:'gap',q:"In my bedroom, there ___ a bed and there ___ two windows. There ___ any posters.",a:[['is',"'s"],['are'],["aren't",'are not']],h:'a bed: một; two windows: nhiều; *any* → phủ định.',e:'is — are — aren’t.',s:"There [v:is] a [s:bed] and there [v:are] two [s:windows]. There [v:aren't] any [s:posters].",i:'bed'},
  {t:'write',p:'Make a question.',q:'There are some cups in the kitchen.',a:['Are there any cups in the kitchen?'],h:'Đảo *are* lên trước *there*; some → any.',e:'Are there any + số nhiều?',s:'[v:Are] there any [s:cups] [u:in] the kitchen?',i:'coffee'},
  {t:'write',p:'Make it negative.',q:'There is a garden.',a:["There isn't a garden.",'There is not a garden.'],h:'Thêm not sau is.',e:'There isn’t a ...',s:"There [v:isn't] a [s:garden].",i:'house'},
  {t:'order',w:['Are','there','any','chairs','some'],a:'Are there any chairs?',h:'Câu hỏi dùng *any*.',e:'Are there any ...?',s:'[v:Are] there any [s:chairs]?',i:'chair'},
  {t:'write',p:'Translate into English.',q:'Có một con mèo trong bếp.',a:['There is a cat in the kitchen.',"There's a cat in the kitchen."],h:'Có một… → There is a…; trong bếp = in the kitchen.',e:'There is + a cat + in the kitchen.',s:'There [v:is] a [s:cat] [u:in] the kitchen.',i:'cat'},
  {t:'write',p:'Fix the mistakes.',q:'There is two sofa in our living room.',a:['There are two sofas in our living room.'],h:'Hai lỗi: is/are và số nhiều của sofa.',e:'There are two sofas.',s:'There [v:are] two [s:sofas] [u:in] [j:our] living room.',i:'sofa'},
  {t:'gap',q:"A: ___ there a desk in ___ room, Vy?\nB: Yes, there ___. ___ desk is white.",a:[['Is'],['your'],['is'],['My']],h:'Hỏi về bạn → your; trả lời về mình → my.',e:'Is there…? your room; Yes, there is. My desk…',s:'[v:Is] there a [s:desk] [u:in] [j:your] room, Vy? Yes, there [v:is]. [j:My] [s:desk] [v:is] [j:white].',i:'table'}
 ],
 sp:{t:'My room',tpl:"[u:In] [j:my] room, there [v:{a.0}] {a.1} [s:{a.2}]. There [v:{b.0}] {b.1} [s:{b.2}].",sl:{a:[['is','a','bed'],['is','a','desk'],['are','two','chairs'],['are','some','posters']],b:[["isn't",'a','TV'],["aren't",'any','plants'],["isn't",'a','sofa']]}}
},
{id:'u2l3',u:2,n:'Lesson 3',t:'Where is it? in, on, under…',ic:'prep:on',
 cards:[
  {t:'Prepositions of place',f:'[u:in] trong · [u:on] trên (chạm) · [u:under] dưới|[u:next to] bên cạnh · [u:behind] sau · [u:in front of] trước|[u:between] ở giữa · [u:near] gần',ex:['[s:The ball] [v:is] [u:in] the box.'],trap:'*on* = nằm trên bề mặt; *in* = ở bên trong.',ill:'prepgrid'},
  {t:'Where is / Where are',f:"Where [v:is] [s:my phone]? — [s:It][v:'s] [u:on] the table.|Where [v:are] [s:my keys]? — [s:They][v:'re] [u:under] the bed.",ex:["Where [v:is] [s:the cat]? — [s:It][v:'s] [u:between] the sofa and the lamp."],trap:'Một vật → is / It. Nhiều vật → are / They.',ill:['phone','keys','cat']}
 ],
 q:[
  {t:'mc',p:'Look. Choose the answer.',q:'The ball is ___ the box.',o:['in','on','under'],a:0,h:'Quả bóng ở bên trong hộp.',e:'in = bên trong.',s:'[s:The ball] [v:is] [u:in] the box.',i:'prep:in'},
  {t:'mc',p:'Look. Choose the answer.',q:'The ball is ___ the table.',o:['on','under','behind'],a:1,h:'Quả bóng ở phía dưới bàn.',e:'under = bên dưới.',s:'[s:The ball] [v:is] [u:under] the table.',i:'prep:under'},
  {t:'match',m:[['in','trong'],['on','trên (bề mặt)'],['under','dưới'],['behind','phía sau'],['next to','bên cạnh']],h:'Xem lại thẻ hình 8 ô.',e:'in – trong, on – trên, under – dưới, behind – sau, next to – bên cạnh.',s:'In. On. Under. Behind. Next to.',i:'prep:next'},
  {t:'tf',p:'Look. Correct or not?',q:'The ball is in front of the box.',a:true,h:'',e:'Đúng: quả bóng ở phía trước hộp = in front of.',s:'[s:The ball] [v:is] [u:in front of] the box.',i:'prep:front'},
  {t:'mc',q:"A: Where ___ my shoes?\nB: They're under the bed.",o:['is','are'],a:1,h:'*my shoes* là nhiều.',e:'Where are + số nhiều?',s:'Where [v:are] [j:my] [s:shoes]?',i:'shoes'},
  {t:'gap',q:"A: Where's my phone?\nB: ___ on the sofa, ___ to the lamp.",a:[["It's",'It is'],['next']],h:'Một vật → It + is. “bên cạnh” = ___ to.',e:'It’s on the sofa, next to the lamp.',s:"[s:It][v:'s] [u:on] the sofa, [u:next to] the lamp.",i:'phone'},
  {t:'order',w:['Where','is','the','bag','are'],a:'Where is the bag?',h:'*the bag* là một.',e:'Where is + số ít?',s:'Where [v:is] [s:the bag]?',i:'bag'},
  {t:'write',p:'Look and answer.',q:'Where is the ball?',a:["It's between the boxes.",'It is between the boxes.','The ball is between the boxes.',"It's between the two boxes.",'It is between the two boxes.'],h:'Quả bóng ở giữa hai cái hộp.',e:'between = ở giữa.',s:"[s:It][v:'s] [u:between] the boxes.",i:'prep:between'},
  {t:'tap',q:'My keys is on the table.',a:2,h:'*My keys* là nhiều.',e:'keys (nhiều) + are.',s:'[j:My] [s:keys] [v:are] [u:on] the table.',i:'keys'},
  {t:'write',p:'Translate into English.',q:'Con mèo ở dưới cái giường.',a:['The cat is under the bed.'],h:'dưới = under.',e:'The cat + is + under + the bed.',s:'[s:The cat] [v:is] [u:under] the bed.',i:'cat'},
  {t:'write',p:'Fix the mistakes.',q:'Where is my books? It is in my bag.',a:['Where are my books? They are in my bag.',"Where are my books? They're in my bag."],h:'*books* là nhiều → be và đại từ cũng đổi.',e:'Where are my books? They are …',s:'Where [v:are] [j:my] [s:books]? [s:They] [v:are] [u:in] [j:my] bag.',i:'book'},
  {t:'gap',q:"A: Where are Lan's glasses?\nB: ___ are on ___ desk, next ___ her laptop.",a:[['They'],['her'],['to']],h:'glasses = nhiều → ?; Lan là nữ → của cô ấy?',e:'They; her desk; next to.',s:"[s:They] [v:are] [u:on] [j:her] desk, [u:next to] [j:her] laptop.",i:'glasses'}
 ],
 sp:{t:'Where is it?',tpl:"[s:{o.0}] [v:{o.1}] [u:{p}] the {f}.",sl:{o:[['My bag','is'],['My books','are'],['The cat','is'],['My shoes','are']],p:['on','under','next to','behind'],f:['bed','desk','sofa','door']}}
},
/* ================= UNIT 3 ================= */
{id:'u3l1',u:3,n:'Lesson 1',t:'Present simple: I, you, we, they',ic:'clock:6:30',
 cards:[
  {t:'Routines',f:'[s:I / You / We / They] + [v:động từ nguyên mẫu]',ex:['[s:I] [v:get up] [a:at 6].','[s:We] [v:go] [u:to] school [a:by bus].'],trap:'Việc lặp lại, thói quen → hiện tại đơn.',ill:['clock:6:00','breakfast','bus']},
  {t:"Negative: don't",f:"[s:I / You / We / They] + [v:don't] + [v:V]",ex:["[s:We] [v:don't watch] TV [a:in the morning]."],trap:"*I not like* là sai. Phải là *I don't like*.",ill:['tv']},
  {t:'Questions: Do …?',f:'[v:Do] + [s:you / they] + [v:V] …?',ex:['[v:Do] [s:you] [v:play] football? — Yes, I do. / No, I don’t.'],trap:'Trả lời ngắn dùng *do / don’t*, không lặp lại động từ.',ill:'swap'}
 ],
 q:[
  {t:'mc',q:'I ___ breakfast at 7.',o:['have','has','am'],a:0,h:'*I* đi với động từ nguyên mẫu.',e:'I + V (nguyên mẫu).',s:'[s:I] [v:have] breakfast [a:at 7].',i:'breakfast'},
  {t:'mc',q:'They ___ go to school on Sunday.',o:["don't","doesn't","aren't"],a:0,h:'*They* phủ định với…?',e:'They + don’t + V.',s:"[s:They] [v:don't go] [u:to] school [a:on Sunday].",i:'school'},
  {t:'tf',q:'I not like coffee.',a:false,h:'',e:'Phủ định cần *don’t*.',s:"[s:I] [v:don't like] coffee.",i:'coffee'},
  {t:'mc',q:'A: Do you play the guitar?\nB: No, I ___.',o:["don't",'am not','not'],a:0,h:'Câu hỏi bắt đầu bằng *Do*.',e:'Do you…? — No, I don’t.',s:"No, [s:I] [v:don't].",i:'guitar'},
  {t:'match',m:[['get','up'],['have','breakfast'],['go','to school'],['do','homework'],['watch','TV']],h:'Đây là các cụm việc hằng ngày.',e:'get up, have breakfast, go to school, do homework, watch TV.',s:'Get up. Have breakfast. Go to school. Do homework. Watch TV.',i:'clock:7:00'},
  {t:'gap',q:"We ___ (get up) at 6. We ___ (not walk) to school. We go by bus.",a:[['get up'],["don't walk",'do not walk']],h:'We + nguyên mẫu; phủ định với don’t.',e:'get up; don’t walk.',s:"[s:We] [v:get up] [a:at 6]. [s:We] [v:don't walk] [u:to] school. [s:We] [v:go] [a:by bus].",i:'bus'},
  {t:'write',p:'Make it negative.',q:'I watch TV after dinner.',a:["I don't watch TV after dinner.",'I do not watch TV after dinner.'],h:'Thêm don’t trước động từ.',e:'I + don’t + watch.',s:"[s:I] [v:don't watch] TV [a:after dinner].",i:'tv'},
  {t:'write',p:'Make a question.',q:'You play games.',a:['Do you play games?'],h:'Thêm *Do* ở đầu câu.',e:'Do + you + V?',s:'[v:Do] [s:you] [v:play] games?',i:'game'},
  {t:'order',w:['Do','they','like','pizza','Are'],a:'Do they like pizza?',h:'Động từ thường → câu hỏi với Do.',e:'Do + they + like…?',s:'[v:Do] [s:they] [v:like] pizza?',i:'pizza'},
  {t:'write',p:'Translate into English.',q:'Chúng tôi làm bài tập về nhà vào buổi tối.',a:['We do homework in the evening.','We do our homework in the evening.','We do our homework in the evenings.','We do homework in the evenings.'],h:'làm bài tập = do homework; buổi tối = in the evening.',e:'We + do homework + in the evening.',s:'[s:We] [v:do] homework [a:in the evening].',i:'book'},
  {t:'write',p:'Fix the mistakes.',q:'Are you play football? Yes, I am.',a:['Do you play football? Yes, I do.'],h:'*play* là động từ thường → không dùng be.',e:'Do you play…? — Yes, I do.',s:'[v:Do] [s:you] [v:play] football? Yes, [s:I] [v:do].',i:'football'},
  {t:'gap',q:'My parents ___ teachers. They ___ (not) work on Saturday. ___ you have a big family?',a:[['are'],["don't",'do not'],['Do']],h:'Câu 1 dùng be. Câu 2 phủ định động từ. Câu 3 hỏi với *have*.',e:'are — don’t — Do.',s:"[j:My] [s:parents] [v:are] teachers. [s:They] [v:don't work] [a:on Saturday]. [v:Do] [s:you] [v:have] a [j:big] family?",i:'family'}
 ],
 sp:{t:'My morning',tpl:"[s:I] [v:{a}] [a:at {t}]. [s:I] [v:don't {b}] [a:in the morning].",sl:{a:['get up','have breakfast','go to school'],t:['6','6:30','7'],b:['watch TV','play games','drink coffee']}}
},
{id:'u3l2',u:3,n:'Lesson 2',t:'like, love, hate + -ing',ic:'swim',
 cards:[
  {t:'like + V-ing',f:'[s:I] [v:love / like / hate] + [v:V-ing]',ex:['[s:I] [v:like] swimming.','[s:They] [v:hate] getting up [a:early].'],trap:'Sau like / love / hate dùng V-ing: *I like swim* là sai.',ill:['swim','music','clock:6:00']},
  {t:'-ing spelling',f:'read → reading, play → playing|dance → dancing (bỏ e)|swim → swimming, run → running (gấp đôi)',ex:['[s:We] [v:love] dancing.'],trap:'Từ ngắn kết thúc phụ âm–nguyên âm–phụ âm thì gấp đôi chữ cuối.',ill:['swim','paint']},
  {t:"don't like / Do you like…?",f:"[s:I] [v:don't like] + V-ing|[v:Do] [s:you] [v:like] + V-ing?",ex:["[s:I] [v:don't like] cooking.",'[v:Do] [s:you] [v:like] reading? — Yes, I do.'],trap:'Trả lời ngắn: *Yes, I do.* Không nói *Yes, I like.*',ill:['chef','book']}
 ],
 q:[
  {t:'mc',q:'I like ___.',o:['swim','swimming','swims'],a:1,h:'Sau *like* dùng dạng nào?',e:'like + V-ing.',s:'[s:I] [v:like] swimming.',i:'swim'},
  {t:'match',m:[['swim','swimming'],['dance','dancing'],['read','reading'],['run','running'],['ride','riding']],h:'Từ có e cuối thì bỏ e; swim, run gấp đôi chữ cuối.',e:'swimming, dancing, reading, running, riding.',s:'Swimming. Dancing. Reading. Running. Riding.',i:'match'},
  {t:'tf',q:'They love play football.',a:false,h:'',e:'love + V-ing: playing.',s:'[s:They] [v:love] playing football.',i:'football'},
  {t:'mc',q:'Do you like ___?',o:['cooking','cook','cooks'],a:0,h:'Sau *like* luôn là V-ing.',e:'like + V-ing.',s:'[v:Do] [s:you] [v:like] cooking?',i:'chef'},
  {t:'tap',q:'We hate geting up early.',a:2,h:'Kiểm tra chính tả -ing của *get*.',e:'get → getting (gấp đôi t).',s:'[s:We] [v:hate] getting up [a:early].',i:'clock:6:00'},
  {t:'gap',q:"I love ___ (read) and I like ___ (draw). I don't like ___ (run).",a:[['reading'],['drawing'],['running']],h:'Cả ba chỗ đều là V-ing. Nhớ gấp đôi chữ cuối của run.',e:'reading, drawing, running.',s:"[s:I] [v:love] reading and [s:I] [v:like] drawing. [s:I] [v:don't like] running.",i:'paint'},
  {t:'write',p:'Make it negative.',q:'They like dancing.',a:["They don't like dancing.",'They do not like dancing.'],h:'They + don’t + like.',e:'They don’t like + V-ing.',s:"[s:They] [v:don't like] dancing.",i:'music'},
  {t:'write',p:'Make a question.',q:'You love swimming.',a:['Do you love swimming?'],h:'Thêm Do ở đầu.',e:'Do you love + V-ing?',s:'[v:Do] [s:you] [v:love] swimming?',i:'swim'},
  {t:'order',w:['I',"don't",'like','shopping','shop'],a:"I don't like shopping.",h:'Sau like là V-ing.',e:'don’t like + shopping.',s:"[s:I] [v:don't like] shopping.",i:'bag'},
  {t:'write',p:'Translate into English.',q:'Tôi thích nghe nhạc.',a:['I like listening to music.','I love listening to music.'],h:'nghe nhạc = listen to music → like + ?',e:'like + listening to music.',s:'[s:I] [v:like] listening [u:to] music.',i:'music'},
  {t:'write',p:'Fix the mistakes.',q:'Do you like swim? Yes, I like.',a:['Do you like swimming? Yes, I do.'],h:'Hai lỗi: dạng sau like, và câu trả lời ngắn.',e:'like swimming; Yes, I do.',s:'[v:Do] [s:you] [v:like] swimming? Yes, [s:I] [v:do].',i:'swim'},
  {t:'gap',q:"My brothers ___ a bike. They love ___ (ride) it. They don't like ___ (walk).",a:[['have'],['riding'],['walking']],h:'*My brothers* = they → have. Sau love/like là V-ing.',e:'have; riding; walking.',s:"[j:My] [s:brothers] [v:have] a bike. [s:They] [v:love] riding it. [s:They] [v:don't like] walking.",i:'bike'}
 ],
 sp:{t:'What do you like?',tpl:"[s:I] [v:love] {a}. [s:I] [v:like] {b}. [s:I] [v:don't like] {c}.",sl:{a:['swimming','dancing','reading'],b:['cooking','drawing','playing games'],c:['running','getting up early','shopping']}}
},
{id:'u3l3',u:3,n:'Lesson 3',t:'Time: on, in, at',ic:'calendar',
 cards:[
  {t:'at / on / in',f:'[a:at] + giờ: at 7 o’clock, at night|[a:on] + ngày: on Monday, on Sunday morning|[a:in] + buổi: in the morning, in the evening',ex:['[s:I] [v:get up] [a:at 6].','[s:We] [v:play] football [a:on Saturday].'],trap:'*on Sunday morning* dùng on vì có tên ngày.',ill:['clock:7:00','calendar','sun']},
  {t:'Telling the time',f:'7:00 seven o’clock|7:30 half past seven|7:15 quarter past seven|7:45 quarter to eight',ex:['What time [v:do] [s:you] [v:get up]? — [s:I] [v:get up] [a:at half past six].'],trap:'Hỏi giờ làm gì: *What time do you …?*',ill:['clock:7:00','clock:7:30','clock:7:15','clock:7:45']}
 ],
 q:[
  {t:'mc',q:'I go to school ___ Monday.',o:['on','in','at'],a:0,h:'Trước tên ngày dùng gì?',e:'on + ngày.',s:'[s:I] [v:go] [u:to] school [a:on Monday].',i:'calendar'},
  {t:'mc',q:"We have dinner ___ 7 o'clock.",o:['at','in','on'],a:0,h:'Trước giờ dùng gì?',e:'at + giờ.',s:"[s:We] [v:have] dinner [a:at 7 o'clock].",i:'clock:7:00'},
  {t:'match',m:[['7:00',"seven o'clock"],['7:30','half past seven'],['7:15','quarter past seven'],['7:45','quarter to eight']],h:'half = 30 phút, quarter = 15 phút.',e:'7:30 half past seven; 7:15 quarter past; 7:45 quarter to eight.',s:"Seven o'clock. Half past seven. Quarter past seven. Quarter to eight.",i:'clock:7:30'},
  {t:'tf',q:"I don't go to school on Sunday.",a:true,h:'',e:'Đúng: on + ngày.',s:"[s:I] [v:don't go] [u:to] school [a:on Sunday].",i:'calendar'},
  {t:'mc',q:'A: What time do you get up?\nB: I get up ___ six.',o:['at','on','in'],a:0,h:'six là giờ.',e:'at + giờ.',s:'[s:I] [v:get up] [a:at six].',i:'clock:6:00'},
  {t:'gap',q:"I play football ___ Saturdays. I do homework ___ the evening and go to bed ___ 10 o'clock.",a:[['on'],['in'],['at']],h:'ngày → ?; buổi → ?; giờ → ?',e:'on Saturdays; in the evening; at 10 o’clock.',s:"[s:I] [v:play] football [a:on Saturdays]. [s:I] [v:do] homework [a:in the evening] and [v:go] [u:to] bed [a:at 10 o'clock].",i:'football'},
  {t:'write',p:'Look at the clock and answer.',q:'What time do you have breakfast?',a:['I have breakfast at half past seven.','I have breakfast at 7:30.','At half past seven.','At 7:30.'],h:'Đồng hồ chỉ 7 giờ 30. Dùng at.',e:'at half past seven.',s:'[s:I] [v:have] breakfast [a:at half past seven].',i:'clock:7:30'},
  {t:'order',w:['What','time','do','you','go','to','school','does'],a:'What time do you go to school?',h:'*you* đi với do hay does?',e:'What time + do + you + V?',s:'What time [v:do] [s:you] [v:go] [u:to] school?',i:'school'},
  {t:'tap',q:"We don't have classes at Sunday.",a:4,h:'Sunday là ngày.',e:'on + ngày.',s:"[s:We] [v:don't have] classes [a:on Sunday].",i:'calendar'},
  {t:'write',p:'Translate into English.',q:'Tôi không xem TV vào buổi sáng.',a:["I don't watch TV in the morning.",'I do not watch TV in the morning.'],h:'không xem = don’t watch; buổi sáng = in the morning.',e:'I + don’t watch TV + in the morning.',s:"[s:I] [v:don't watch] TV [a:in the morning].",i:'tv'},
  {t:'write',p:'Fix the mistakes.',q:"What time you get up? I get up in 6 o'clock.",a:["What time do you get up? I get up at 6 o'clock.",'What time do you get up? I get up at 6.',"What time do you get up? I get up at six o'clock."],h:'Câu hỏi thiếu một từ; giờ đi với giới từ nào?',e:'What time do you…? at 6 o’clock.',s:"What time [v:do] [s:you] [v:get up]? [s:I] [v:get up] [a:at 6 o'clock].",i:'clock:6:00'},
  {t:'gap',q:"On Sundays my friends and I ___ (like) ___ (swim). We ___ get up early on Sundays.",a:[['like','love'],['swimming'],["don't",'do not']],h:'*my friends and I* = we. Sau like là V-ing.',e:'like swimming; don’t get up.',s:"[a:On Sundays] [j:my] [s:friends and I] [v:like] swimming. [s:We] [v:don't get up] [a:early] [a:on Sundays].",i:'swim'}
 ],
 sp:{t:'My week',tpl:"[s:I] [v:{a}] [a:on {d}] [a:{t}]. [s:I] [v:go] [u:to] bed [a:at {h}].",sl:{a:['play football','go swimming','visit my grandma'],d:['Saturday','Sunday','Friday'],t:['in the morning','in the afternoon','in the evening'],h:["9 o'clock",'half past nine',"10 o'clock"]}}
},
/* ================= FOCUS: can ================= */
{id:'fcan',u:3,n:'Focus',t:'can and can’t',ic:'swim',
 cards:[
  {t:"can / can't + V",f:"[s:I / He / They…] + [v:can] + [v:V]|[s:I / He / They…] + [v:can't] + [v:V]",ex:['[s:She] [v:can swim].',"[s:I] [v:can't sing]."],trap:'Sau can dùng động từ nguyên mẫu, không thêm s, không có to: *She cans*, *can to swim* đều sai.',ill:['swim','music']},
  {t:'Can you…?',f:"[v:Can] + [s:you] + [v:V] …?|Yes, I can. / No, I can't.",ex:['[v:Can] [s:you] [v:ride] a bike? — Yes, [s:I] [v:can].'],trap:'Trả lời ngắn dùng *can / can’t*, không dùng do.',ill:['bike']}
 ],
 q:[
  {t:'mc',q:'My cat can ___.',o:['jump','jumps','to jump'],a:0,h:'Sau *can* là động từ dạng nào?',e:'can + V nguyên mẫu.',s:'[j:My] [s:cat] [v:can jump].',i:'cat'},
  {t:'mc',q:'A: Can you play the piano?\nB: No, I ___.',o:["can't","don't",'am not'],a:0,h:'Câu hỏi bắt đầu bằng *Can*.',e:'Can you…? — No, I can’t.',s:"No, [s:I] [v:can't].",i:'music'},
  {t:'tf',q:'He cans speak English.',a:false,h:'',e:'can không bao giờ thêm s.',s:'[s:He] [v:can speak] English.',i:'boy'},
  {t:'tap',q:'She can to cook pasta.',a:2,h:'Sau can có từ nào thừa không?',e:'can + V, không có *to*.',s:'[s:She] [v:can cook] pasta.',i:'chef'},
  {t:'match',m:[['ride','a bike'],['play','the guitar'],['speak','French'],['cook','dinner'],['draw','pictures']],h:'Nghĩ xem động từ nào đi với đồ vật nào.',e:'ride a bike, play the guitar, speak French, cook dinner, draw pictures.',s:'Ride a bike. Play the guitar. Speak French. Cook dinner. Draw pictures.',i:'bike'},
  {t:'gap',q:"I ___ swim but I ___ (not) dive. ___ you swim?",a:[['can'],["can't",'cannot'],['Can']],h:'Câu 2 là phủ định. Câu 3 là câu hỏi.',e:'can — can’t — Can.',s:"[s:I] [v:can swim] but [s:I] [v:can't dive]. [v:Can] [s:you] [v:swim]?",i:'swim'},
  {t:'write',p:'Make it negative.',q:'Tom can draw cats.',a:["Tom can't draw cats.",'Tom cannot draw cats.'],h:"can → can't",e:'can’t + V.',s:"[s:Tom] [v:can't draw] cats.",i:'paint'},
  {t:'write',p:'Make a question.',q:'She can play the guitar.',a:['Can she play the guitar?'],h:'Đưa can lên đầu.',e:'Can + she + V?',s:'[v:Can] [s:she] [v:play] the guitar?',i:'guitar'},
  {t:'order',w:['Can','your','dog','swim','swims'],a:'Can your dog swim?',h:'Sau can là nguyên mẫu.',e:'Can + S + V?',s:'[v:Can] [j:your] [s:dog] [v:swim]?',i:'dog'},
  {t:'write',p:'Translate into English.',q:'Bà tôi không biết dùng điện thoại.',a:["My grandmother can't use a phone.","My grandma can't use a phone.",'My grandmother cannot use a phone.','My grandma cannot use a phone.',"My grandmother can't use a smartphone.","My grandma can't use a smartphone."],h:'không biết (làm gì) = can’t + V.',e:'My grandma + can’t + use…',s:"[j:My] [s:grandma] [v:can't use] a phone.",i:'phone'},
  {t:'write',p:'Fix the mistakes.',q:'Can you cooking? Yes, I do.',a:['Can you cook? Yes, I can.'],h:'Sau can là nguyên mẫu; trả lời ngắn với can.',e:'Can you cook? — Yes, I can.',s:'[v:Can] [s:you] [v:cook]? Yes, [s:I] [v:can].',i:'chef'},
  {t:'gap',q:"My brother loves ___ (play) football. He ___ run fast, but he ___ (not) swim.",a:[['playing'],['can'],["can't",'cannot']],h:'Sau love là V-ing. Hai chỗ sau dùng can.',e:'playing; can; can’t.',s:"[j:My] [s:brother] [v:loves] playing football. [s:He] [v:can run] [a:fast], but [s:he] [v:can't swim].",i:'football'}
 ],
 sp:{t:'What can you do?',tpl:"[s:I] [v:can {a}]. [s:I] [v:can't {b}]. [s:{p.0}] [v:can {p.1}] [a:{p.2}].",sl:{a:['swim','cook','draw'],b:['sing','dance','ride a horse'],p:[['My mum','cook','very well'],['My friend','speak English','well'],['My dog','jump','very high']]}}
},
/* ================= UNIT 4 ================= */
{id:'u4l1',u:4,n:'Lesson 1',t:'he, she, it + -s / -es',ic:'woman',
 cards:[
  {t:'he / she / it + V-s',f:'[s:He / She / It] + [v:V-s]',ex:['[s:She] [v:plays] tennis.','[j:My] [s:dad] [v:works] [u:in] a bank.'],trap:'Nhớ thêm s với he / she / it. Đây là lỗi hay quên nhất!',ill:['woman','man','cat']},
  {t:'Spelling -s / -es',f:'phần lớn + s: plays, reads|s, sh, ch, x, o + es: watches, washes, goes, does|phụ âm + y → ies: study → studies|have → has',ex:['[s:He] [v:watches] TV.','[s:Lan] [v:studies] English.'],trap:'*play* có nguyên âm trước y nên chỉ thêm s: plays.',ill:['tv','book']}
 ],
 q:[
  {t:'mc',q:'My mum ___ coffee every morning.',o:['drinks','drink','drinkes'],a:0,h:'*My mum* = she → động từ thêm gì?',e:'she + V-s: drinks.',s:'[j:My] [s:mum] [v:drinks] coffee [a:every morning].',i:'coffee'},
  {t:'forms',pre:'she',m:[['watch','watches'],['play','plays'],['study','studies'],['go','goes'],['finish','finishes'],['have','has']],h:'s, sh, ch, x, o → -es; phụ âm + y → -ies; have → has.',e:'watches, plays, studies, goes, finishes, has.',s:'She watches. She plays. She studies. She goes. She finishes. She has.',i:'woman'},
  {t:'tf',q:'He watchs TV after school.',a:false,h:'',e:'watch kết thúc bằng ch → watches.',s:'[s:He] [v:watches] TV [a:after school].',i:'tv'},
  {t:'mc',q:'Lan ___ English on Tuesdays.',o:['studies','studys','study'],a:0,h:'study: phụ âm + y.',e:'study → studies.',s:'[s:Lan] [v:studies] English [a:on Tuesdays].',i:'book'},
  {t:'tap',q:'My brother go to bed late.',a:2,h:'*My brother* = he.',e:'he + goes.',s:'[j:My] [s:brother] [v:goes] [u:to] bed [a:late].',i:'moon'},
  {t:'gap',q:"Mai ___ (get) up at 6. She ___ (wash) her face and ___ (have) breakfast.",a:[['gets'],['washes'],['has']],h:'Mai = she. wash có sh; have là đặc biệt.',e:'gets, washes, has.',s:'[s:Mai] [v:gets up] [a:at 6]. [s:She] [v:washes] [j:her] face and [v:has] breakfast.',i:'breakfast'},
  {t:'write',p:'Change I to She.',q:'I play the piano and I do my homework.',a:['She plays the piano and she does her homework.','She plays the piano and does her homework.'],h:'play → ?; do → ?; my → her.',e:'plays; does; her homework.',s:'[s:She] [v:plays] the piano and [s:she] [v:does] [j:her] homework.',i:'music'},
  {t:'order',w:['The','bus','leaves','at','8','leave'],a:'The bus leaves at 8.',h:'*The bus* = it.',e:'it + V-s: leaves.',s:'[s:The bus] [v:leaves] [a:at 8].',i:'bus'},
  {t:'mc',q:"A: What does your dad do?\nB: He ___ in a hospital. He's a doctor.",o:['works','work','working'],a:0,h:'He + động từ thêm s.',e:'he + works.',s:'[s:He] [v:works] [u:in] a hospital.',i:'doctor'},
  {t:'write',p:'Translate into English.',q:'Anh trai tôi học tiếng Nhật.',a:['My brother studies Japanese.','My brother learns Japanese.','My older brother studies Japanese.','My big brother studies Japanese.'],h:'anh trai tôi = he → study → ?',e:'My brother + studies + Japanese.',s:'[j:My] [s:brother] [v:studies] Japanese.',i:'flag:jp'},
  {t:'write',p:'Fix the mistakes.',q:'My sister love dancing and she have a dance class on Fridays.',a:['My sister loves dancing and she has a dance class on Fridays.','My sister loves dancing and has a dance class on Fridays.'],h:'Hai động từ đều thiếu dạng của she.',e:'loves; has.',s:'[j:My] [s:sister] [v:loves] dancing and [s:she] [v:has] a dance class [a:on Fridays].',i:'music'},
  {t:'gap',q:"Ken ___ from Japan. He ___ (live) in Hanoi now. He ___ (teach) English ___ Mondays.",a:[['is',"'s"],['lives'],['teaches'],['on']],h:'Câu 1 dùng be. teach có ch. Ngày đi với giới từ nào?',e:'is; lives; teaches; on Mondays.',s:'[s:Ken] [v:is] [u:from] Japan. [s:He] [v:lives] [u:in] Hanoi [a:now]. [s:He] [v:teaches] English [a:on Mondays].',i:'teacher'}
 ],
 sp:{t:"My friend's day",tpl:"[s:{p.0}] [v:{a}] [a:at {t}]. [s:{p.1}] [v:{b}] [a:in the evening].",sl:{p:[['My friend Lan','She'],['My brother','He'],['My dad','He']],a:['gets up','has breakfast','goes to school'],t:['6','6:30','7'],b:['watches TV','does homework','reads books']}}
},
{id:'u4l2',u:4,n:'Lesson 2',t:"doesn't and Does…?",ic:'man',
 cards:[
  {t:"Negative: doesn't + V",f:"[s:He / She / It] + [v:doesn't] + [v:V]",ex:["[s:He] [v:doesn't like] fish."],trap:"Có *doesn't* rồi thì động từ bỏ s: *doesn't likes* là sai.",ill:['fish','man']},
  {t:'Questions: Does …?',f:"[v:Does] + [s:he / she / it] + [v:V] …?|Yes, she does. / No, she doesn't.",ex:['[v:Does] [s:she] [v:live] near here? — Yes, [s:she] [v:does].'],trap:'Does đã mang s, nên động từ chính giữ nguyên mẫu.',ill:'swap'},
  {t:'Wh- questions',f:'What [v:does] [s:he] [v:do]?|Where [v:does] [s:she] [v:work]?',ex:['Where [v:does] [j:your] [s:mum] [v:work]?'],trap:'Từ hỏi + does + S + V.',ill:['woman','house']}
 ],
 q:[
  {t:'mc',q:'She ___ like milk.',o:["doesn't","don't","isn't"],a:0,h:'*She* + phủ định động từ thường.',e:'she + doesn’t + V.',s:"[s:She] [v:doesn't like] milk.",i:'tea'},
  {t:'mc',q:'___ your brother play games?',o:['Does','Do','Is'],a:0,h:'*your brother* = he.',e:'Does + he + V?',s:'[v:Does] [j:your] [s:brother] [v:play] games?',i:'game'},
  {t:'tf',q:"He doesn't watches TV.",a:false,h:'',e:'Sau doesn’t dùng nguyên mẫu: watch.',s:"[s:He] [v:doesn't watch] TV.",i:'tv'},
  {t:'mc',q:'A: Does Anna speak French?\nB: Yes, she ___.',o:['does','do','speaks'],a:0,h:'Câu hỏi dùng *Does*.',e:'Does…? — Yes, she does.',s:'Yes, [s:she] [v:does].',i:'flag:fr'},
  {t:'match',m:[['Does he like pizza?','Yes, he does.'],['Do they live here?',"No, they don't."],['Is she a nurse?','Yes, she is.'],['Can it swim?',"No, it can't."]],h:'Câu trả lời ngắn dùng lại từ đầu câu hỏi.',e:'Does → does; Do → don’t; Is → is; Can → can’t.',s:"Yes, he does. No, they don't. Yes, she is. No, it can't.",i:'match'},
  {t:'gap',q:"My dad ___ (not) drink coffee. He ___ (drink) tea. ___ he drink milk? No, he ___.",a:[["doesn't",'does not'],['drinks'],['Does'],["doesn't"]],h:'Câu 1 phủ định; câu 2 khẳng định với he; câu 3 hỏi.',e:'doesn’t; drinks; Does; doesn’t.',s:"[j:My] [s:dad] [v:doesn't drink] coffee. [s:He] [v:drinks] tea. [v:Does] [s:he] [v:drink] milk? No, [s:he] [v:doesn't].",i:'tea'},
  {t:'write',p:'Make it negative.',q:'Tom plays the guitar.',a:["Tom doesn't play the guitar.",'Tom does not play the guitar.'],h:'doesn’t + play (bỏ s).',e:'doesn’t + V nguyên mẫu.',s:"[s:Tom] [v:doesn't play] the guitar.",i:'guitar'},
  {t:'write',p:'Make a question.',q:'She goes to school by bike.',a:['Does she go to school by bike?'],h:'Does ở đầu; goes → go.',e:'Does + she + go…?',s:'[v:Does] [s:she] [v:go] [u:to] school [a:by bike]?',i:'bike'},
  {t:'order',w:['Where','does','your','mum','work','works'],a:'Where does your mum work?',h:'Sau does là nguyên mẫu.',e:'Where + does + S + V?',s:'Where [v:does] [j:your] [s:mum] [v:work]?',i:'woman'},
  {t:'write',p:'Translate into English.',q:'Em gái tôi không thích cá.',a:["My sister doesn't like fish.",'My sister does not like fish.',"My little sister doesn't like fish.","My younger sister doesn't like fish."],h:'em gái tôi = she → doesn’t + like.',e:'My sister + doesn’t like + fish.',s:"[j:My] [s:sister] [v:doesn't like] fish.",i:'fish'},
  {t:'write',p:'Fix the mistakes.',q:'Does your cat likes milk? Yes, it do.',a:['Does your cat like milk? Yes, it does.'],h:'Hai lỗi: động từ sau Does, và câu trả lời ngắn.',e:'Does … like? — Yes, it does.',s:'[v:Does] [j:your] [s:cat] [v:like] milk? Yes, [s:it] [v:does].',i:'cat'},
  {t:'gap',q:"A: What time ___ Mai get up?\nB: She ___ (get) up ___ 6:30. She ___ (not) have breakfast at home.",a:[['does'],['gets'],['at'],["doesn't",'does not']],h:'Hỏi với does; giờ đi với at; câu cuối phủ định.',e:'does; gets; at; doesn’t.',s:"What time [v:does] [s:Mai] [v:get up]? [s:She] [v:gets up] [a:at 6:30]. [s:She] [v:doesn't have] breakfast [u:at] home.",i:'clock:6:30'}
 ],
 sp:{t:'Ask about a friend',tpl:"[v:Does] [s:{p.0}] [v:{a.0}] {a.1}? Yes, [s:{p.1}] [v:does]. [s:{p.1}] [v:{a.2}] {a.1} [a:every day]. But [s:{p.1}] [v:doesn't {b}].",sl:{p:[['Lan','she'],['your brother','he'],['Tom','he']],a:[['like','pizza','likes'],['play','football','plays'],['watch','cartoons','watches']],b:['like fish','play tennis','read comics']}}
},
{id:'u4l3',u:4,n:'Lesson 3',t:'always, usually, never…',ic:'calendar',
 cards:[
  {t:'How often?',f:'[a:always] 100% · [a:usually] 80% · [a:often] 60%|[a:sometimes] 40% · [a:never] 0%',ex:['[s:I] [a:always] [v:get up] [a:at 6].'],trap:'never đã mang nghĩa phủ định: *I never eat fish*, không thêm don’t.',ill:'freq'},
  {t:'Where does it go?',f:'trước động từ thường: [s:She] [a:usually] [v:walks]|sau be: [s:He] [v:is] [a:never] late',ex:['[s:She] [a:usually] [v:walks] [u:to] school.','[s:He] [v:is] [a:never] [j:late].'],trap:'*I go always* sai. *She always is* sai.',ill:['school','clock:8:15']},
  {t:'How often…?',f:'How often [v:do] [s:you] [v:play] football?|[a:Every day]. / [a:Twice a week]. / [a:Once a month].',ex:['How often [v:does] [s:she] [v:swim]? — [a:Three times a week].'],trap:'1 lần = once, 2 lần = twice, 3 lần trở lên = three times…',ill:['calendar','swim']}
 ],
 q:[
  {t:'mc',q:'I ___ eat fish. (0%)',o:['never','always','often'],a:0,h:'0% = không bao giờ.',e:'never = 0%.',s:'[s:I] [a:never] [v:eat] fish.',i:'fish'},
  {t:'match',m:[['always','100%'],['usually','80%'],['often','60%'],['sometimes','40%'],['never','0%']],h:'Xem thang chấm ở thẻ.',e:'always 100, usually 80, often 60, sometimes 40, never 0.',s:'Always. Usually. Often. Sometimes. Never.',i:'calendar'},
  {t:'tf',q:'She goes always to school by bus.',a:false,h:'',e:'Trạng từ tần suất đứng trước động từ thường.',s:'[s:She] [a:always] [v:goes] [u:to] school [a:by bus].',i:'bus'},
  {t:'mc',p:'Choose the correct sentence.',q:'',o:['He is often late.','He often is late.','Often he late is.'],a:0,h:'Câu có *is* (be): trạng từ đứng trước hay sau be?',e:'be + trạng từ tần suất.',s:'[s:He] [v:is] [a:often] [j:late].',i:'clock:8:15'},
  {t:'mc',q:'A: How often do you play games?\nB: ___ (2 times a week)',o:['Twice a week.','Two week.','Always a week.'],a:0,h:'2 lần có từ riêng.',e:'2 lần = twice.',s:'[a:Twice a week].',i:'game'},
  {t:'order',w:['I','often','read','before','bed','reads'],a:'I often read before bed.',h:'*I* đi với nguyên mẫu; often đứng trước động từ.',e:'S + often + V.',s:'[s:I] [a:often] [v:read] [a:before bed].',i:'book'},
  {t:'write',p:'Put the word in the right place.',q:'She is happy. (always)',a:['She is always happy.'],h:'Câu có is → trạng từ đứng sau is.',e:'be + always.',s:'[s:She] [v:is] [a:always] [j:happy].',i:'girl'},
  {t:'write',p:'Put the word in the right place.',q:'They play tennis. (sometimes)',a:['They sometimes play tennis.','Sometimes they play tennis.'],h:'Đứng trước động từ thường *play*.',e:'S + sometimes + V.',s:'[s:They] [a:sometimes] [v:play] tennis.',i:'ball'},
  {t:'gap',q:"My dad ___ (always / drink) coffee. My mum ___ (never / be) late.",a:[['always drinks'],['is never']],h:'Câu 1: trạng từ + động từ thường (dad = he). Câu 2: be + trạng từ.',e:'always drinks; is never.',s:'[j:My] [s:dad] [a:always] [v:drinks] coffee. [j:My] [s:mum] [v:is] [a:never] [j:late].',i:'coffee'},
  {t:'write',p:'Translate into English.',q:'Tôi thường đi bộ đến trường.',a:['I usually walk to school.','I often walk to school.'],h:'thường = usually; đứng trước walk.',e:'I + usually + walk + to school.',s:'[s:I] [a:usually] [v:walk] [u:to] school.',i:'school'},
  {t:'write',p:'Fix the mistakes.',q:'My brother never do homework and he late always is.',a:['My brother never does homework and he is always late.','My brother never does his homework and he is always late.'],h:'Hai lỗi: động từ với he, và vị trí always với is.',e:'never does; is always late.',s:'[j:My] [s:brother] [a:never] [v:does] homework and [s:he] [v:is] [a:always] [j:late].',i:'book'},
  {t:'gap',q:"A: How often ___ Lan go swimming?\nB: She ___ (usually / go) ___ Saturdays. She ___ swim very fast!",a:[['does'],['usually goes'],['on'],['can']],h:'Lan = she. Ngày đi với giới từ nào? “có thể bơi” dùng gì?',e:'does; usually goes; on; can.',s:'How often [v:does] [s:Lan] [v:go] swimming? [s:She] [a:usually] [v:goes] [a:on Saturdays]. [s:She] [v:can swim] [a:very fast]!',i:'swim'}
 ],
 sp:{t:'How often?',tpl:"[s:I] [a:{f}] [v:{a}]. [s:{p.0}] [a:{g}] [v:{p.1}].",sl:{f:['always','usually','sometimes','never'],a:['get up early','walk to school','eat vegetables'],p:[['My mum','drinks coffee'],['My brother','plays games'],['My dog','sleeps on the sofa']],g:['always','often','never']}}
},
/* ================= FOCUS: have ================= */
{id:'fhave',u:4,n:'Focus',t:'have and has',ic:'dog',
 cards:[
  {t:'have / has',f:'[s:I / You / We / They] + [v:have]|[s:He / She / It] + [v:has]',ex:['[s:I] [v:have] a cat.','[s:She] [v:has] two brothers.'],trap:'Không nói *She have*.',ill:['cat','family']},
  {t:"don't have / doesn't have",f:"[s:I / We…] + [v:don't have]|[s:He / She…] + [v:doesn't have]",ex:["[s:We] [v:don't have] a car.","[s:He] [v:doesn't have] a bike."],trap:'Sau doesn’t dùng *have*, không dùng has.',ill:['car','bike']},
  {t:'Do / Does … have?',f:'[v:Do] [s:you] [v:have] …?|[v:Does] [s:she] [v:have] …?',ex:['[v:Do] [s:you] [v:have] a pet? — Yes, I do.','[v:Does] [s:Mai] [v:have] a phone? — No, she doesn’t.'],trap:'Trả lời ngắn dùng do / does, không dùng have.',ill:['dog','phone']}
 ],
 q:[
  {t:'mc',q:'My brother ___ a new bike.',o:['have','has'],a:1,h:'*My brother* = he.',e:'he + has.',s:'[j:My] [s:brother] [v:has] a [j:new] bike.',i:'bike'},
  {t:'mc',q:'We ___ a big garden.',o:['have','has'],a:0,h:'*We* đi với have hay has?',e:'we + have.',s:'[s:We] [v:have] a [j:big] garden.',i:'house'},
  {t:'tf',q:"She doesn't has a pet.",a:false,h:'',e:'doesn’t + have.',s:"[s:She] [v:doesn't have] a pet.",i:'cat'},
  {t:'mc',q:'A: Do you have a pen?\nB: Yes, I ___.',o:['do','have','does'],a:0,h:'Câu hỏi bắt đầu bằng *Do*.',e:'Do you…? — Yes, I do.',s:'Yes, [s:I] [v:do].',i:'pen'},
  {t:'tap',q:'Does Tom has a computer?',a:2,h:'Sau Does là nguyên mẫu.',e:'Does + S + have.',s:'[v:Does] [s:Tom] [v:have] a computer?',i:'laptop'},
  {t:'gap',q:"I ___ a dog. I ___ (not) a cat. My sister ___ a bird.",a:[['have'],["don't have",'do not have'],['has']],h:'Câu 2 là phủ định (tôi không có mèo). My sister = she.',e:'have; don’t have; has.',s:"[s:I] [v:have] a dog. [s:I] [v:don't have] a cat. [j:My] [s:sister] [v:has] a bird.",i:'dog'},
  {t:'write',p:'Make it negative.',q:'He has a camera.',a:["He doesn't have a camera.",'He does not have a camera.'],h:'doesn’t + have.',e:'has → doesn’t have.',s:"[s:He] [v:doesn't have] a camera.",i:'camera'},
  {t:'write',p:'Make a question.',q:'They have a car.',a:['Do they have a car?'],h:'They → Do.',e:'Do + they + have…?',s:'[v:Do] [s:they] [v:have] a car?',i:'car'},
  {t:'order',w:['Does','she','have','a','guitar','has'],a:'Does she have a guitar?',h:'Sau Does là nguyên mẫu.',e:'Does + she + have?',s:'[v:Does] [s:she] [v:have] a guitar?',i:'guitar'},
  {t:'write',p:'Translate into English.',q:'Bố tôi có hai chiếc xe đạp.',a:['My father has two bikes.','My dad has two bikes.','My father has two bicycles.','My dad has two bicycles.'],h:'bố tôi = he → has.',e:'My dad + has + two bikes.',s:'[j:My] [s:dad] [v:has] two bikes.',i:'bike'},
  {t:'write',p:'Fix the mistakes.',q:'My friend Anna have two brother. Their names is Max and Leo.',a:['My friend Anna has two brothers. Their names are Max and Leo.'],h:'Ba lỗi: have/has, số nhiều, is/are.',e:'has; brothers; are.',s:'[j:My] [s:friend Anna] [v:has] two brothers. [j:Their] [s:names] [v:are] Max and Leo.',i:'family'},
  {t:'gap',q:"A: ___ you have a phone?\nB: Yes. ___ phone is on the table, next ___ the lamp.",a:[['Do'],['My'],['to']],h:'Hỏi với have → Do. Điện thoại của tôi. bên cạnh = next ___.',e:'Do; My; next to.',s:'[v:Do] [s:you] [v:have] a phone? Yes. [j:My] [s:phone] [v:is] [u:on] the table, [u:next to] the lamp.',i:'phone'}
 ],
 sp:{t:'What do you have?',tpl:"[s:I] [v:have] {x}. [s:{p.0}] [v:has] {p.1}. [s:We] [v:don't have] {y}.",sl:{x:['a cat','a bike','two brothers'],p:[['My sister','a phone'],['My brother','a guitar'],['My friend','a dog']],y:['a car','a garden','a TV']}}
}
];

const CARD_VI={
 u1l1:['Động từ “to be”: là, thì, ở','Cách viết ngắn khi nói'],
 u1l2:['Câu phủ định: thêm not','Câu hỏi: đưa be lên đầu','Tên nước và quốc tịch'],
 u1l3:['Từ chỉ “của ai”','“của” + tên người','Hỏi tên, quê, tuổi'],
 u2l1:['Cái này, cái kia, những cái này, những cái kia','Danh từ số nhiều','Một cái gì đó'],
 u2l2:['“Có …” ở một nơi nào đó','Không có… / Có… không?'],
 u2l3:['Đồ vật ở đâu?','Hỏi và trả lời vị trí'],
 u3l1:['Việc làm hằng ngày','Không làm gì','Hỏi: Bạn có… không?'],
 u3l2:['Thích, yêu, ghét làm gì','Cách thêm -ing','Không thích / Bạn có thích…?'],
 u3l3:['Giới từ chỉ thời gian','Cách nói giờ'],
 fcan:['Có thể / không thể làm gì','Hỏi: Bạn có thể… không?'],
 u4l1:['Anh ấy, cô ấy làm gì','Thêm -s hay -es?'],
 u4l2:['Anh ấy, cô ấy không làm gì','Hỏi về anh ấy, cô ấy','Hỏi với từ để hỏi'],
 u4l3:['Bao lâu một lần?','Trạng từ đứng ở đâu?','Hỏi: How often…?'],
 fhave:['Có (sở hữu)','Không có','Hỏi: Bạn có… không?']
};
