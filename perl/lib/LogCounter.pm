package LogCounter;
use strict;
use warnings;
use Data::Dumper;


sub new {
    my ($class, $logs) = @_;
    return bless { logs => $logs }, $class;
};


sub group_by_user {
    my $self = shift;

    # get username list
    my @users = map { $_->user } @{$self->{logs}};
    @users = do {
        my %h = map {$_ => 1} @users;
        sort keys %h;
    };
    
    my %ret = map {$_, 1} @users;
    foreach my $user (@users) {
        my @log_user = grep { $_->user eq $user } @{$self->{logs}};
        $ret{$user} = \@log_user;
    }

    return \%ret;
}


sub count_error {
    my $self = shift;
    scalar grep {$_->status =~ /^5..$/} @{$self->{logs}};
}


1;
