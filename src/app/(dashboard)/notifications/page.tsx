
'use client';

import { useNotifications } from "@/context/notification-context";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function NotificationsPage() {
    const { notifications, markAllAsRead, clearNotifications } = useNotifications();

    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2">
                        <Bell />
                        Central de Notificações
                    </CardTitle>
                    <CardDescription>
                        Veja aqui todas as atualizações e alertas importantes do sistema.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {notifications.length === 0 ? (
                         <div className="flex flex-col items-center justify-center text-center p-12 text-muted-foreground bg-muted/50 rounded-lg">
                            <BellOff className="w-12 h-12 mb-4" />
                            <p className="text-lg font-semibold">Tudo em ordem!</p>
                            <p>Você não tem nenhuma notificação nova no momento.</p>
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-4">
                            {notifications.map(notif => (
                                <div key={notif.id} className={cn("flex items-start gap-4 p-4 rounded-lg border-l-4", notif.read ? 'bg-muted/30 border-transparent' : 'bg-card border-primary')}>
                                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", notif.read ? 'bg-muted-foreground/20' : 'bg-primary/10')}>
                                        <notif.icon className={cn("h-5 w-5", notif.read ? 'text-muted-foreground' : 'text-primary')} />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className={cn("font-semibold", notif.read && "text-muted-foreground")}>{notif.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(notif.createdAt, { addSuffix: true, locale: ptBR })}
                                            </p>
                                        </div>
                                        <p className={cn("text-sm", notif.read ? 'text-muted-foreground' : 'text-foreground/80')}>
                                            {notif.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
                {notifications.length > 0 && (
                    <CardFooter className="flex justify-end gap-2 border-t pt-4">
                        <Button variant="ghost" onClick={markAllAsRead}>
                            <CheckCheck className="mr-2" />
                            Marcar todas como lidas
                        </Button>
                        <Button variant="destructive" onClick={clearNotifications}>
                            Limpar Notificações
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}
