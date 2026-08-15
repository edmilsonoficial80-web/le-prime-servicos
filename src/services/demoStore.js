const STORAGE_KEY = 'leprime.demo.v1';
const DAY = 86400000;
const now = Date.now();
const face = (id) => `https://images.unsplash.com/${id}?w=256&h=256&q=80&auto=format&fit=crop&crop=faces`;
const work = (id) => `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`;
const seedProfessionals = [
    {
        uid: 'pro_1',
        role: 'professional',
        name: 'Miguel Andrade',
        email: 'miguel@leprime.pt',
        phone: '+351 912 345 678',
        city: 'Lisboa',
        photoURL: face('photo-1633332755192-727a05c4013d'),
        specialty: 'eletricista',
        description: 'Eletricista certificado com foco em instalações residenciais, quadros elétricos e domótica. Trabalho limpo, garantia de 2 anos.',
        experienceYears: 12,
        rating: 4.9,
        reviewsCount: 148,
        completedJobs: 213,
        portfolio: [work('photo-1621905251189-08b45d6a269e'), work('photo-1558618666-fcd25c85cd64')],
        approval: 'approved',
        featured: true,
        earnings: 18450,
        hourlyRate: 35,
        location: { lat: 38.7223, lng: -9.1393 },
        createdAt: now - 400 * DAY,
    },
    {
        uid: 'pro_2',
        role: 'professional',
        name: 'Sofia Marques',
        email: 'sofia@leprime.pt',
        phone: '+351 933 221 100',
        city: 'Porto',
        photoURL: face('photo-1573497019940-1c28c88b4f3e'),
        specialty: 'remodelacao',
        description: 'Coordeno remodelações completas de cozinhas e casas de banho. Orçamento detalhado e prazos cumpridos.',
        experienceYears: 9,
        rating: 4.8,
        reviewsCount: 96,
        completedJobs: 121,
        portfolio: [work('photo-1600585154340-be6161a56a0c'), work('photo-1600607687939-ce8a6c25118c')],
        approval: 'approved',
        featured: true,
        earnings: 31200,
        hourlyRate: 42,
        location: { lat: 41.1579, lng: -8.6291 },
        createdAt: now - 320 * DAY,
    },
    {
        uid: 'pro_3',
        role: 'professional',
        name: 'Ricardo Nunes',
        email: 'ricardo@leprime.pt',
        phone: '+351 966 100 200',
        city: 'Lisboa',
        photoURL: face('photo-1507003211169-0a1dd7228f2d'),
        specialty: 'canalizador',
        description: 'Canalizador 24h. Deteção de fugas, substituição de tubagens e desentupimentos.',
        experienceYears: 15,
        rating: 4.7,
        reviewsCount: 210,
        completedJobs: 340,
        portfolio: [work('photo-1585704032915-c3400ca199e7')],
        approval: 'approved',
        featured: true,
        earnings: 27800,
        hourlyRate: 38,
        location: { lat: 38.7369, lng: -9.1427 },
        createdAt: now - 500 * DAY,
    },
    {
        uid: 'pro_4',
        role: 'professional',
        name: 'Ana Ferreira',
        email: 'ana@leprime.pt',
        phone: '+351 921 555 444',
        city: 'Braga',
        photoURL: face('photo-1544005313-94ddf0286df2'),
        specialty: 'limpeza',
        description: 'Limpezas profundas domésticas e de escritório. Produtos ecológicos incluídos.',
        experienceYears: 6,
        rating: 5,
        reviewsCount: 74,
        completedJobs: 189,
        portfolio: [work('photo-1581578731548-c64695cc6952')],
        approval: 'approved',
        earnings: 9600,
        hourlyRate: 18,
        location: { lat: 41.5454, lng: -8.4265 },
        createdAt: now - 210 * DAY,
    },
    {
        uid: 'pro_5',
        role: 'professional',
        name: 'Tiago Lopes',
        email: 'tiago@leprime.pt',
        phone: '+351 918 777 333',
        city: 'Lisboa',
        photoURL: face('photo-1500648767791-00dcc994a43e'),
        specialty: 'pintor',
        description: 'Pintura interior e exterior, estuque e acabamentos decorativos.',
        experienceYears: 8,
        rating: 4.6,
        reviewsCount: 63,
        completedJobs: 98,
        portfolio: [work('photo-1562259949-e8e7689d7828')],
        approval: 'approved',
        earnings: 12400,
        hourlyRate: 25,
        location: { lat: 38.7071, lng: -9.1355 },
        createdAt: now - 150 * DAY,
    },
    {
        uid: 'pro_6',
        role: 'professional',
        name: 'Carla Dias',
        email: 'carla@leprime.pt',
        phone: '+351 939 888 222',
        city: 'Coimbra',
        photoURL: face('photo-1438761681033-6461ffad8d80'),
        specialty: 'tecnico-informatico',
        description: 'Assistência a computadores, redes domésticas e recuperação de dados.',
        experienceYears: 5,
        rating: 4.8,
        reviewsCount: 41,
        completedJobs: 67,
        portfolio: [],
        approval: 'pending',
        earnings: 4200,
        hourlyRate: 30,
        location: { lat: 40.2033, lng: -8.4103 },
        createdAt: now - 6 * DAY,
    },
    {
        uid: 'pro_7',
        role: 'professional',
        name: 'Bruno Teixeira',
        email: 'bruno@leprime.pt',
        phone: '+351 927 654 321',
        city: 'Faro',
        photoURL: face('photo-1552058544-f2b08422138a'),
        specialty: 'ar-condicionado',
        description: 'Instalação e manutenção de sistemas de climatização e bombas de calor.',
        experienceYears: 11,
        rating: 4.9,
        reviewsCount: 88,
        completedJobs: 140,
        portfolio: [work('photo-1631545806609-24b7c4b7d1f2')],
        approval: 'pending',
        earnings: 15900,
        hourlyRate: 40,
        location: { lat: 37.0194, lng: -7.9304 },
        createdAt: now - 3 * DAY,
    },
];
const seedUsers = [
    {
        uid: 'admin_1',
        role: 'admin',
        name: 'Equipa LE Prime',
        email: 'admin@leprime.pt',
        phone: '+351 210 000 000',
        city: 'Lisboa',
        createdAt: now - 600 * DAY,
    },
    {
        uid: 'client_1',
        role: 'client',
        name: 'Joana Pereira',
        email: 'joana@exemplo.pt',
        phone: '+351 915 222 111',
        city: 'Lisboa',
        photoURL: face('photo-1494790108377-be9c29b29330'),
        favorites: ['pro_1', 'pro_3'],
        location: { lat: 38.7223, lng: -9.1393 },
        createdAt: now - 90 * DAY,
    },
    {
        uid: 'client_2',
        role: 'client',
        name: 'Paulo Costa',
        email: 'paulo@exemplo.pt',
        phone: '+351 936 444 555',
        city: 'Porto',
        favorites: [],
        location: { lat: 41.1579, lng: -8.6291 },
        createdAt: now - 45 * DAY,
    },
    ...seedProfessionals,
];
const seedRequests = [
    {
        id: 'req_1',
        clientId: 'client_1',
        clientName: 'Joana Pereira',
        clientPhoto: face('photo-1494790108377-be9c29b29330'),
        categoryId: 'eletricista',
        title: 'Substituir quadro elétrico do apartamento',
        description: 'O quadro é antigo e dispara com frequência. Preciso de substituição completa com diferencial e certificação.',
        photos: [work('photo-1621905251189-08b45d6a269e')],
        address: 'Av. da Liberdade 120, Lisboa',
        location: { lat: 38.7223, lng: -9.1393 },
        date: new Date(now + 3 * DAY).toISOString().slice(0, 10),
        urgency: 'high',
        budget: 450,
        status: 'open',
        proposalsCount: 2,
        createdAt: now - 2 * 3600000,
    },
    {
        id: 'req_2',
        clientId: 'client_2',
        clientName: 'Paulo Costa',
        categoryId: 'pintor',
        title: 'Pintar sala e corredor (45 m²)',
        description: 'Duas demãos, cor branco sujo. Material por conta do profissional.',
        photos: [],
        address: 'Rua de Santa Catarina 88, Porto',
        location: { lat: 41.1479, lng: -8.6109 },
        date: new Date(now + 9 * DAY).toISOString().slice(0, 10),
        urgency: 'medium',
        budget: 600,
        status: 'open',
        proposalsCount: 1,
        createdAt: now - 26 * 3600000,
    },
    {
        id: 'req_3',
        clientId: 'client_1',
        clientName: 'Joana Pereira',
        clientPhoto: face('photo-1494790108377-be9c29b29330'),
        categoryId: 'canalizador',
        title: 'Fuga de água por baixo da banca',
        description: 'Sifão a pingar desde ontem. Precisa de intervenção rápida.',
        photos: [],
        address: 'Av. da Liberdade 120, Lisboa',
        location: { lat: 38.7223, lng: -9.1393 },
        date: new Date(now - 5 * DAY).toISOString().slice(0, 10),
        urgency: 'high',
        budget: 120,
        status: 'in_progress',
        proposalsCount: 1,
        acceptedProposalId: 'prop_3',
        professionalId: 'pro_3',
        professionalName: 'Ricardo Nunes',
        createdAt: now - 6 * DAY,
    },
    {
        id: 'req_4',
        clientId: 'client_1',
        clientName: 'Joana Pereira',
        clientPhoto: face('photo-1494790108377-be9c29b29330'),
        categoryId: 'limpeza',
        title: 'Limpeza profunda pós-obra T3',
        description: 'Apartamento com poeiras de obra, incluindo vidros e marquise.',
        photos: [],
        address: 'Rua do Ouro 15, Lisboa',
        date: new Date(now - 20 * DAY).toISOString().slice(0, 10),
        urgency: 'medium',
        budget: 220,
        status: 'completed',
        proposalsCount: 3,
        acceptedProposalId: 'prop_4',
        professionalId: 'pro_4',
        professionalName: 'Ana Ferreira',
        reviewed: true,
        createdAt: now - 24 * DAY,
    },
    {
        id: 'req_5',
        clientId: 'client_2',
        clientName: 'Paulo Costa',
        categoryId: 'jardinagem',
        title: 'Manutenção mensal de jardim 80 m²',
        description: 'Corte de relva, sebes e limpeza de folhas. Contrato mensal.',
        photos: [work('photo-1416879595882-3373a0480b5b')],
        address: 'Rua das Flores 30, Porto',
        location: { lat: 41.1421, lng: -8.6156 },
        date: new Date(now + 5 * DAY).toISOString().slice(0, 10),
        urgency: 'low',
        budget: 90,
        status: 'open',
        proposalsCount: 0,
        createdAt: now - 4 * 3600000,
    },
];
const seedProposals = [
    {
        id: 'prop_1',
        requestId: 'req_1',
        requestTitle: 'Substituir quadro elétrico do apartamento',
        clientId: 'client_1',
        professionalId: 'pro_1',
        professionalName: 'Miguel Andrade',
        professionalPhoto: face('photo-1633332755192-727a05c4013d'),
        professionalRating: 4.9,
        price: 420,
        message: 'Bom dia! Faço o serviço com material Hager incluído e certificado. Disponível já amanhã.',
        estimatedDays: 1,
        status: 'pending',
        createdAt: now - 3600000,
    },
    {
        id: 'prop_2',
        requestId: 'req_1',
        requestTitle: 'Substituir quadro elétrico do apartamento',
        clientId: 'client_1',
        professionalId: 'pro_3',
        professionalName: 'Ricardo Nunes',
        professionalPhoto: face('photo-1507003211169-0a1dd7228f2d'),
        professionalRating: 4.7,
        price: 480,
        message: 'Posso avançar esta semana. Inclui deslocação e garantia de 2 anos.',
        estimatedDays: 2,
        status: 'pending',
        createdAt: now - 1800000,
    },
    {
        id: 'prop_3',
        requestId: 'req_3',
        requestTitle: 'Fuga de água por baixo da banca',
        clientId: 'client_1',
        professionalId: 'pro_3',
        professionalName: 'Ricardo Nunes',
        professionalPhoto: face('photo-1507003211169-0a1dd7228f2d'),
        professionalRating: 4.7,
        price: 110,
        message: 'Resolvo hoje mesmo. Substituo sifão e vedantes.',
        estimatedDays: 1,
        status: 'accepted',
        createdAt: now - 5.5 * DAY,
    },
    {
        id: 'prop_4',
        requestId: 'req_4',
        requestTitle: 'Limpeza profunda pós-obra T3',
        clientId: 'client_1',
        professionalId: 'pro_4',
        professionalName: 'Ana Ferreira',
        professionalPhoto: face('photo-1544005313-94ddf0286df2'),
        professionalRating: 5,
        price: 200,
        message: 'Equipa de 2 pessoas, um dia de trabalho. Materiais incluídos.',
        estimatedDays: 1,
        status: 'accepted',
        createdAt: now - 23 * DAY,
    },
    {
        id: 'prop_5',
        requestId: 'req_2',
        requestTitle: 'Pintar sala e corredor (45 m²)',
        clientId: 'client_2',
        professionalId: 'pro_5',
        professionalName: 'Tiago Lopes',
        professionalPhoto: face('photo-1500648767791-00dcc994a43e'),
        professionalRating: 4.6,
        price: 560,
        message: 'Tinta CIN incluída, 3 dias de trabalho com proteção total do mobiliário.',
        estimatedDays: 3,
        status: 'pending',
        createdAt: now - 20 * 3600000,
    },
];
const seedConversations = [
    {
        id: 'conv_1',
        requestId: 'req_3',
        requestTitle: 'Fuga de água por baixo da banca',
        participantIds: ['client_1', 'pro_3'],
        participants: [
            { uid: 'client_1', name: 'Joana Pereira', role: 'client', photoURL: face('photo-1494790108377-be9c29b29330') },
            { uid: 'pro_3', name: 'Ricardo Nunes', role: 'professional', photoURL: face('photo-1507003211169-0a1dd7228f2d') },
        ],
        lastMessage: 'Combinado, apareço amanhã às 9h.',
        lastMessageAt: now - 40 * 60000,
        unread: { client_1: 1, pro_3: 0 },
    },
    {
        id: 'conv_2',
        requestId: 'req_1',
        requestTitle: 'Substituir quadro elétrico do apartamento',
        participantIds: ['client_1', 'pro_1'],
        participants: [
            { uid: 'client_1', name: 'Joana Pereira', role: 'client', photoURL: face('photo-1494790108377-be9c29b29330') },
            { uid: 'pro_1', name: 'Miguel Andrade', role: 'professional', photoURL: face('photo-1633332755192-727a05c4013d') },
        ],
        lastMessage: 'Enviei a proposta com o material incluído.',
        lastMessageAt: now - 55 * 60000,
        unread: { client_1: 0, pro_1: 0 },
    },
];
const seedMessages = [
    {
        id: 'msg_1',
        conversationId: 'conv_1',
        senderId: 'client_1',
        text: 'Boa tarde Ricardo, a fuga continua. Consegue passar amanhã de manhã?',
        createdAt: now - 70 * 60000,
    },
    {
        id: 'msg_2',
        conversationId: 'conv_1',
        senderId: 'pro_3',
        text: 'Boa tarde! Consigo sim.',
        createdAt: now - 50 * 60000,
    },
    {
        id: 'msg_3',
        conversationId: 'conv_1',
        senderId: 'pro_3',
        text: 'Combinado, apareço amanhã às 9h.',
        createdAt: now - 40 * 60000,
    },
    {
        id: 'msg_4',
        conversationId: 'conv_2',
        senderId: 'pro_1',
        text: 'Enviei a proposta com o material incluído.',
        createdAt: now - 55 * 60000,
    },
];
const seedReviews = [
    {
        id: 'rev_1',
        requestId: 'req_4',
        requestTitle: 'Limpeza profunda pós-obra T3',
        professionalId: 'pro_4',
        clientId: 'client_1',
        clientName: 'Joana Pereira',
        clientPhoto: face('photo-1494790108377-be9c29b29330'),
        rating: 5,
        comment: 'Impecável! A casa ficou como nova e cumpriram o horário à risca.',
        createdAt: now - 19 * DAY,
    },
    {
        id: 'rev_2',
        requestId: 'req_0',
        requestTitle: 'Instalação de tomadas',
        professionalId: 'pro_1',
        clientId: 'client_2',
        clientName: 'Paulo Costa',
        rating: 5,
        comment: 'Profissional, pontual e explicou tudo. Recomendo sem reservas.',
        createdAt: now - 30 * DAY,
    },
    {
        id: 'rev_3',
        requestId: 'req_0b',
        requestTitle: 'Reparação de disjuntor',
        professionalId: 'pro_1',
        clientId: 'client_1',
        clientName: 'Joana Pereira',
        rating: 4,
        comment: 'Bom trabalho, apenas chegou 20 minutos atrasado.',
        createdAt: now - 60 * DAY,
    },
];
const seedNotifications = [
    {
        id: 'not_1',
        userId: 'client_1',
        type: 'proposal_received',
        title: 'Nova proposta recebida',
        body: 'Miguel Andrade enviou uma proposta de 420 € para "Substituir quadro elétrico".',
        link: '/cliente/pedidos/req_1',
        read: false,
        createdAt: now - 3600000,
    },
    {
        id: 'not_2',
        userId: 'client_1',
        type: 'message',
        title: 'Nova mensagem',
        body: 'Ricardo Nunes: Combinado, apareço amanhã às 9h.',
        link: '/conversas/conv_1',
        read: false,
        createdAt: now - 40 * 60000,
    },
    {
        id: 'not_3',
        userId: 'pro_1',
        type: 'system',
        title: 'Novo pedido na sua área',
        body: 'Um novo pedido de Eletricista foi publicado em Lisboa.',
        link: '/profissional/servicos',
        read: true,
        createdAt: now - 2 * 3600000,
    },
];
const seedReports = [
    {
        id: 'rep_1',
        reporterId: 'client_2',
        reporterName: 'Paulo Costa',
        targetId: 'pro_5',
        targetName: 'Tiago Lopes',
        targetType: 'user',
        reason: 'Trabalho não realizado',
        description: 'Aceitou o serviço mas nunca compareceu nem respondeu às mensagens.',
        status: 'open',
        createdAt: now - 2 * DAY,
    },
];
const buildSeed = () => ({
    users: seedUsers,
    passwords: {
        'joana@exemplo.pt': 'demo1234',
        'miguel@leprime.pt': 'demo1234',
        'admin@leprime.pt': 'demo1234',
    },
    requests: seedRequests,
    proposals: seedProposals,
    conversations: seedConversations,
    messages: seedMessages,
    reviews: seedReviews,
    notifications: seedNotifications,
    reports: seedReports,
    sessionUid: null,
});
class DemoStore {
    constructor() {
        this.listeners = new Set();
        this.state = this.load();
    }
    load() {
        if (typeof window === 'undefined')
            return buildSeed();
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw)
                return buildSeed();
            const parsed = JSON.parse(raw);
            return { ...buildSeed(), ...parsed };
        }
        catch {
            return buildSeed();
        }
    }
    persist() {
        if (typeof window === 'undefined')
            return;
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
        }
        catch {
            /* quota excedida — ignorado no modo demonstração */
        }
    }
    get db() {
        return this.state;
    }
    /** Aplica uma mutação e notifica todos os subscritores. */
    update(mutator) {
        mutator(this.state);
        this.persist();
        this.listeners.forEach((listener) => listener());
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }
    reset() {
        this.state = buildSeed();
        this.persist();
        this.listeners.forEach((listener) => listener());
    }
}
export const demoStore = new DemoStore();
/** Cria uma subscrição "live" semelhante ao onSnapshot do Firestore. */
export const demoSubscribe = (selector, callback) => {
    callback(selector(demoStore.db));
    return demoStore.subscribe(() => callback(selector(demoStore.db)));
};
